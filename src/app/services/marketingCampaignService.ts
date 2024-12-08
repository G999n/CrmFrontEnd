import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarketingCampaign } from '../models/MarketingCampaign';

@Injectable({
  providedIn: 'root',
})
export class MarketingCampaignService {
  private apiUrl = 'https://localhost:7178/api/MarketingCampaign';

  constructor(private http: HttpClient) {}

  getAll(): Observable<MarketingCampaign[]> {
    return this.http.get<MarketingCampaign[]>(this.apiUrl);
  }

  getById(id: number): Observable<MarketingCampaign> {
    return this.http.get<MarketingCampaign>(`${this.apiUrl}/${id}`);
  }

  create(campaign: MarketingCampaign): Observable<MarketingCampaign> {
    return this.http.post<MarketingCampaign>(this.apiUrl, campaign);
  }

  update(id: number, campaign: MarketingCampaign): Observable<MarketingCampaign> {
    return this.http.put<MarketingCampaign>(`${this.apiUrl}/${id}`, campaign);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
