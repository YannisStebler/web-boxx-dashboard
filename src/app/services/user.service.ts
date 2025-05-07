import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private readonly apiUrl = 'https://api.quikcashier.com/api/users';

    constructor(private http: HttpClient) {}

    async getAllUsers(): Promise<User[]> {
        return lastValueFrom(this.http.get<User[]>(this.apiUrl));
    }

    async getUserById(userId: string): Promise<User> {
        return lastValueFrom(this.http.get<User>(`${this.apiUrl}/${userId}`));
    }
}
