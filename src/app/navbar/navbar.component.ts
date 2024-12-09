import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  notifications: any[] = []; 
  showNotifications: boolean = false; 

  constructor(private router: Router, private http: HttpClient) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  toggleNotifications() {
    if(localStorage.getItem('authToken')==null) {
      this.showNotifications = false;
      return;
    }
    
    this.showNotifications = !this.showNotifications;
 
    if(!this.showNotifications) this.notifications = [];

    if (this.showNotifications && this.notifications.length === 0) {
      this.fetchNotifications();
    }
  }

  fetchNotifications() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (username && password) {
      const apiUrl = `https://localhost:7178/api/Notification/User/${username}/${password}`;
      this.http.get<Notification[]>(apiUrl).subscribe({
        next: (data) => {
          console.log(data);
          this.notifications = data;
        },
        error: (error) => {
          console.error('Failed to fetch notifications:', error);
        }
      });
    } else {
      console.error('Missing username or password in localStorage.');
    }
  }

  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
  }
}
