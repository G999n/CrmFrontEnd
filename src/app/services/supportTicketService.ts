import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupportTicket } from '../models/SupportTicket';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupportTicketService {

  private apiUrl = 'https://localhost:7178/api/SupportTicket';

  constructor(private http: HttpClient) { }

  getAllTickets(): Observable<SupportTicket[]> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.get<SupportTicket[]>(this.apiUrl, { headers });
  }

  addTicket(ticket: SupportTicket): Observable<SupportTicket> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.post<SupportTicket>(this.apiUrl, ticket, { headers });
  }

  getTicketById(id: number): Observable<SupportTicket> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.get<SupportTicket>(`${this.apiUrl}/${id}`, { headers });
  }

  updateTicket(id: number, ticket: SupportTicket): Observable<SupportTicket> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.put<SupportTicket>(`${this.apiUrl}/${id}`, ticket, { headers });
  }

  deleteTicket(id: number): Observable<void> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
