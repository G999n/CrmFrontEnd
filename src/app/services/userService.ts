import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User'; 
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'https://localhost:7178/api/User';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });

    return this.http.get<User[]>(this.baseUrl, {headers});
  }

  addUser(userData: User): Observable<User> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.post<User>(`${this.baseUrl}`, userData, {headers});
  }

  getUserById(id: number): Observable<User> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.get<User>(`${this.baseUrl}/${id}`, {headers});
  }

  updateUser(id: number, userData: User): Observable<User> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.put<User>(`${this.baseUrl}/${id}`, userData, {headers});
  }

  deleteUser(id: number): Observable<void> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {headers});
  }
}
