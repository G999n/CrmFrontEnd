import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Lead } from '../models/Lead';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private apiUrl = 'https://localhost:7178/api/Lead';

  constructor(private http: HttpClient) {}

  // Get all leads
  getAllLeads(): Observable<Lead[]> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.get<Lead[]>(this.apiUrl, { headers }).pipe(catchError(this.handleError));
  }

  // Add a new lead
  addLead(lead: Lead): Observable<Lead> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.post<Lead>(this.apiUrl, lead, { headers }).pipe(catchError(this.handleError));
  }

  // Get lead by ID
  getLeadById(id: number): Observable<Lead> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.get<Lead>(`${this.apiUrl}/${id}`, { headers }).pipe(catchError(this.handleError));
  }

  // Update lead by ID
  updateLead(id: number, lead: Lead): Observable<Lead> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.put<Lead>(`${this.apiUrl}/${id}`, lead, { headers }).pipe(catchError(this.handleError));
  }

  // Delete lead by ID
  deleteLead(id: number): Observable<void> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(catchError(this.handleError));
  }

  // Convert lead by ID
  convertLead(id: number): Observable<void> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.post<void>(`${this.apiUrl}/Convert/${id}`, {}, { headers }).pipe(catchError(this.handleError));
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    alert('Operation failed. Please try again later.');
    return throwError(error);
  }
}
