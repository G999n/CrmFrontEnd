import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Opportunity } from '../models/Opportunity';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {
  private apiUrl = 'https://localhost:7178/api/Opportunity';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Opportunity[]> {
    return this.http.get<Opportunity[]>(this.apiUrl);
  }

  create(opportunity: Opportunity): Observable<Opportunity> {
    return this.http.post<Opportunity>(this.apiUrl, opportunity);
  }

  getById(id: number): Observable<Opportunity> {
    return this.http.get<Opportunity>(`${this.apiUrl}/${id}`);
  }

  update(id: number, opportunity: Opportunity): Observable<Opportunity> {
    return this.http.put<Opportunity>(`${this.apiUrl}/${id}`, opportunity);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
