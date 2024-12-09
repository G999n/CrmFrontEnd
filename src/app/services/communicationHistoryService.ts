import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommunicationHistory } from '../models/CommunicationHistory'; 

@Injectable({
  providedIn: 'root'
})
export class CommunicationHistoryService {

  private apiUrl = 'https://localhost:7178/api/CommunicationHistory';

  constructor(private http: HttpClient) { }

  // Get all communication history
  getAllCommunicationHistory(): Observable<CommunicationHistory[]> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.get<CommunicationHistory[]>(this.apiUrl, { headers });
  }

  // Create a new communication history record
  createCommunicationHistory(data: CommunicationHistory): Observable<CommunicationHistory> {
    return this.http.post<CommunicationHistory>(this.apiUrl, data, this.getHttpOptions());
  }

  // Get a communication history record by ID
  getCommunicationHistoryById(id: number): Observable<CommunicationHistory> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.get<CommunicationHistory>(`${this.apiUrl}/${id}`, { headers });
  }

  // Update a communication history record
  updateCommunicationHistory(id: number, data: CommunicationHistory): Observable<CommunicationHistory> {
    return this.http.put<CommunicationHistory>(`${this.apiUrl}/${id}`, data, this.getHttpOptions());
  }

  // Delete a communication history record by ID
  deleteCommunicationHistory(id: number): Observable<void> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // Helper method to get HTTP options with headers (if needed)
  private getHttpOptions() {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });
    return { headers };
  }
}
