import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarketingCampaign } from '../models/MarketingCampaign';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MarketingCampaignService {
  private apiUrl = 'https://localhost:7178/api/MarketingCampaign';

  constructor(private http: HttpClient) {}

  getAll(): Observable<MarketingCampaign[]> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.get<MarketingCampaign[]>(this.apiUrl, { headers });
  }

  getById(id: number): Observable<MarketingCampaign> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.get<MarketingCampaign>(`${this.apiUrl}/${id}`, { headers });
  }

  create(campaign: MarketingCampaign): Observable<MarketingCampaign> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.post<MarketingCampaign>(this.apiUrl, campaign, { headers });
  }

  update(id: number, campaign: MarketingCampaign): Observable<MarketingCampaign> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.put<MarketingCampaign>(`${this.apiUrl}/${id}`, campaign, { headers });
  }

  delete(id: number): Observable<void> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
