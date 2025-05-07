import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { WsServiceService } from './ws.service';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly baseUrl = 'https://api.quikcashier.com/api/orders';

  constructor(private http: HttpClient, private wsService: WsServiceService) {
    this.wsService.onMessage().subscribe((message) => {
      if (message.action === 'newOrder') {
        this.loadOrders();
      }
    });
  }

  async loadOrders(): Promise<Array<Order>> {
    return lastValueFrom(this.http.get<Array<Order>>(this.baseUrl));
  }

  async addOrder(order: Omit<Order, 'id' | 'timestamp' | 'completed' | 'orderNumber'>): Promise<Order> {
    const newOrder = await lastValueFrom(this.http.post<Order>(this.baseUrl, order));
    this.wsService.sendMessage({ action: 'newOrder', order: newOrder });
    return newOrder;
  }

  async completeOrder(orderId: string): Promise<void> {
    console.log('Completing order:', orderId);
    await lastValueFrom(this.http.put<void>(`${this.baseUrl}/${orderId}/complete`, {}));
  }

  async loadOrderHistory(): Promise<Array<Order>> {
    return lastValueFrom(this.http.get<Array<Order>>(`${this.baseUrl}/history`));
  }

  async searchOrderHistoryByDate(date: string): Promise<Array<Order>> {
    return lastValueFrom(this.http.get<Array<Order>>(`${this.baseUrl}/history/search?date=${date}`));
  }

  async searchOrderHistoryByOrderNumber(orderNumber: string): Promise<Order> {
    return lastValueFrom(this.http.get<Order>(`${this.baseUrl}/history/search?orderNumber=${orderNumber}`));
  }
}
