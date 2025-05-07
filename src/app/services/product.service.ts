import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'https://api.quikcashier.com/api/products';

  constructor(private http: HttpClient) {}

  async loadProducts(): Promise<Product[]> {
    return lastValueFrom(this.http.get<Product[]>(this.apiUrl));
  }

  async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    return lastValueFrom(this.http.post<Product>(this.apiUrl, product));
  }

  async deleteProduct(productId: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.apiUrl}/${productId}`));
  }
}
