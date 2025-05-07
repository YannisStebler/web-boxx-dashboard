import { Component, OnInit, TemplateRef } from '@angular/core';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../services/order.service';
import { WsServiceService } from '../../../services/ws.service';
import { CommonModule, CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconDirective } from '../../../core/feather-icon/feather-icon.directive';

@Component({
  selector: 'app-active-orders',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, NgFor, NgIf, CommonModule, FeatherIconDirective],
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.scss'],
})
export class ActiveOrdersComponent implements OnInit { 
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  basicModalCloseResult: string = '';

  constructor(
    private orderService: OrderService,
    private wsService: WsServiceService,
    private modalService: NgbModal
  ) {
    // WebSocket message handling
    this.wsService.onMessage().subscribe((message) => {
      if (message.action === 'newOrder') {
        this.getOrders();
      }
    });
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.loadOrders().then((orders) => {
      this.orders = orders.sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    });
  }

  closeOrder(orderId: string) {
    this.orderService.completeOrder(orderId);
    this.orders = this.orders.filter((order) => order.id !== orderId);
  }

  changeSortOrder() {
    this.orders.reverse();
  }

  openBasicModal(content: TemplateRef<any>, order: Order) {
    this.selectedOrder = order;
    this.modalService
      .open(content)
      .result.then((result) => {
        this.basicModalCloseResult = 'Modal closed: ' + result;
        this.selectedOrder = null;
      })
      .catch(() => {
        this.selectedOrder = null;
      });
  }

  getProductList(order: Order) {
    return Object.entries(order.products).map(([name, quantity]) => ({
      name,
      quantity,
    }));
  }
}
