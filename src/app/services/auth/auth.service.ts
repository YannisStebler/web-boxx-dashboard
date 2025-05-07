import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api.quikcashier.com/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(identifier: string, password: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/login`,
      { identifier, password },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register`,
      { username, email, password },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      console.error('No access token found in local storage');
      this.router.navigate(['/auth/login']);
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  getExpDateFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      console.error('No access token found in local storage');
      this.router.navigate(['/auth/login']);
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
