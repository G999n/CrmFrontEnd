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

  private loginUrl = 'https://localhost:7178/api/Login/login'; // Backend API URL

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    // Prepare the login payload
    const loginPayload = { username, password };

    return this.http.post<any>(this.loginUrl, loginPayload).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Handle Unauthorized errors (Invalid credentials or Token Expiry)
          const errorMessage = error.error?.message || 'Login Failed';
          alert(errorMessage);
          this.router.navigate(['/login']);
        }
        return of(null); // Return an observable with null value to stop further processing
      })
    ).subscribe(response => {
      if (response && response.token) {
        // Store the token in localStorage as a JSON object
        const authToken = { token: response.token };
        localStorage.setItem('authToken', JSON.stringify(authToken));
        // Optionally, navigate to the dashboard or another page after successful login
        this.router.navigate(['/home']);
      }
    });
  }

  // A helper method to check if the user is logged in
  isLoggedIn(): boolean {
    const authToken = localStorage.getItem('authToken');
    return authToken !== null;
  }

  // A helper method to log out the user
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
