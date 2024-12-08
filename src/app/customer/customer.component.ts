import { Component } from '@angular/core';
import { Customer } from '../models/Customer';
import { CustomerService } from '../services/customerService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  customers: Customer[] = [];
  newCustomer: Customer = {
    customerId: 0,
    name: '',
    company: '',
    industry: '',
    contactDetails: '',
    accountStatus: '',
    lastContactDate: new Date()
  };

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers(): void {
    this.customerService.getAllCustomers().subscribe(
      (data) => {
        this.customers = data;
      },
      (error) => {
        this.showAlert('Failed to load customers');
      }
    );
  }

  addCustomer(): void {
    this.customerService.addCustomer(this.newCustomer).subscribe(
      () => {
        this.getAllCustomers();
        this.newCustomer = { customerId: 0, name: '', company: '', industry: '', contactDetails: '', accountStatus: '', lastContactDate: new Date() };
      },
      () => {
        this.showAlert('Failed to add customer');
      }
    );
  }

  updateCustomer(customer: Customer): void {
    this.customerService.updateCustomer(customer).subscribe(
      () => {
        this.getAllCustomers();
      },
      () => {
        this.showAlert('Failed to update customer');
      }
    );
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe(
      () => {
        this.getAllCustomers();
      },
      () => {
        this.showAlert('Failed to delete customer');
      }
    );
  }

  showAlert(message: string): void {
    alert(message);
  }
}
