import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupportTicket } from '../models/SupportTicket';

@Injectable({
  providedIn: 'root'
})
export class SupportTicketService {

  private apiUrl = 'https://localhost:7178/api/SupportTicket';

  constructor(private http: HttpClient) { }

  getAllTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(this.apiUrl);
  }

  addTicket(ticket: SupportTicket): Observable<SupportTicket> {
    return this.http.post<SupportTicket>(this.apiUrl, ticket);
  }

  getTicketById(id: number): Observable<SupportTicket> {
    return this.http.get<SupportTicket>(`${this.apiUrl}/${id}`);
  }

  updateTicket(id: number, ticket: SupportTicket): Observable<SupportTicket> {
    return this.http.put<SupportTicket>(`${this.apiUrl}/${id}`, ticket);
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
