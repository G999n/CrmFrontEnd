import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Opportunity } from '../models/Opportunity';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {
  private apiUrl = 'https://localhost:7178/api/Opportunity';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Opportunity[]> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.get<Opportunity[]>(this.apiUrl, { headers });
  }

  create(opportunity: Opportunity): Observable<Opportunity> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.post<Opportunity>(this.apiUrl, opportunity, { headers });
  }

  getById(id: number): Observable<Opportunity> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.get<Opportunity>(`${this.apiUrl}/${id}`, { headers });
  }

  update(id: number, opportunity: Opportunity): Observable<Opportunity> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.put<Opportunity>(`${this.apiUrl}/${id}`, opportunity, { headers });
  }

  delete(id: number): Observable<void> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
