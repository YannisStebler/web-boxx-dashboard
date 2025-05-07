import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = 'https://api.quikcashier.com/api/sales';

  constructor(private http: HttpClient) {}

  getSalesReport(type: 'daily' | 'weekly' | 'yearly' | 'total'): Observable<any> {
    const url = `${this.apiUrl}/${type}`;
    return this.http.get<any>(url);
  }
}