import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Lead } from '../models/Lead';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private apiUrl = 'https://localhost:7178/api/Lead';

  constructor(private http: HttpClient) {}

  // Get all leads
  getAllLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  // Add a new lead
  addLead(lead: Lead): Observable<Lead> {
    return this.http.post<Lead>(this.apiUrl, lead).pipe(catchError(this.handleError));
  }

  // Get lead by ID
  getLeadById(id: number): Observable<Lead> {
    return this.http.get<Lead>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Update lead by ID
  updateLead(id: number, lead: Lead): Observable<Lead> {
    return this.http.put<Lead>(`${this.apiUrl}/${id}`, lead).pipe(catchError(this.handleError));
  }

  // Delete lead by ID
  deleteLead(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Convert lead by ID
  convertLead(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/Convert/${id}`, {}).pipe(catchError(this.handleError));
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    alert('Operation failed. Please try again later.');
    return throwError(error);
  }
}
