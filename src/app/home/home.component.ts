import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  menuItems = [
    { label: 'Communication History', route: '/communication-history', logo: 'assets/icons/communication.png' },
    { label: 'Customers', route: '/customers', logo: 'assets/icons/customers.png' },
    { label: 'Leads', route: '/leads', logo: 'assets/icons/leads.png' },
    { label: 'Marketing Campaigns', route: '/marketing-campaigns', logo: 'assets/icons/marketing.png' },
    { label: 'Opportunities', route: '/opportunities', logo: 'assets/icons/opportunities.png' },
    { label: 'Support Tickets', route: '/support-tickets', logo: 'assets/icons/support.png' },
    { label: 'Tasks', route: '/tasks', logo: 'assets/icons/tasks.png' },
    { label: 'Users', route: '/users', logo: 'assets/icons/users.png' },
  ];

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
