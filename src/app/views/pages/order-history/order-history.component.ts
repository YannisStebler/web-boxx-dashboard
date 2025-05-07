import { Component, TemplateRef } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order.model';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss',
})
export class OrderHistoryComponent {
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  basicModalCloseResult: string = '';

  constructor(
    private orderService: OrderService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.loadOrderHistory().then((orders) => {
      this.orders = orders.sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    });
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
