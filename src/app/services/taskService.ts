import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task'; 
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7178/api/Task';

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.get<Task[]>(this.apiUrl, { headers });
  }

  addTask(task: Task): Observable<Task> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.post<Task>(this.apiUrl, task, { headers });
  }

  getTaskById(id: number): Observable<Task> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.get<Task>(`${this.apiUrl}/${id}`, { headers });
  }

  updateTask(id: number, task: Task): Observable<Task> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task, { headers });
  }

  deleteTask(id: number): Observable<void> {
    const authToken = JSON.parse(localStorage.getItem('authToken') || '{}').token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
