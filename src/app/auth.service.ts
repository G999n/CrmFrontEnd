// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'https://localhost:7178/api/Login/login'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    const loginPayload = { username, password };
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    return this.http.post<any>(this.loginUrl, loginPayload).pipe(
      catchError((error) => {
        if (error.status === 401) {
          const errorMessage = error.error?.message || 'Login Failed';
          alert(errorMessage);
          this.router.navigate(['/login']);
        }
        return of(null);
      })
    ).subscribe(response => {
      if (response && response.token) {
        const authToken = { token: response.token };
        localStorage.setItem('authToken', JSON.stringify(authToken));

        //setting role also in localStorage
        const payload = response.token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        localStorage.setItem('role', decodedPayload.role);

        this.router.navigate(['/home']);
      }
    });
  }

  isLoggedIn(): boolean {
    const authToken = localStorage.getItem('authToken');
    return authToken !== null;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);
  }
}
