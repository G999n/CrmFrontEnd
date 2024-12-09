import { Component } from '@angular/core';
import { SupportTicket } from '../models/SupportTicket';
import { SupportTicketService } from '../services/supportTicketService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-support-ticket',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './support-ticket.component.html',
  styleUrl: './support-ticket.component.css'
})
export class SupportTicketComponent {
  tickets: SupportTicket[] = [];
  ticket: SupportTicket = { ticketId: 0, customerId: 0, issueDescription: '', assignedTo: 0, ticketStatus: '', resolutionDate: null };
  isEdit: boolean = false;

  constructor(private ticketService: SupportTicketService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getAllTickets().subscribe(
      (data) => { this.tickets = data; },
      (error) => { 
        console.log(error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('Error: Failed to Load Tickets');
        }}
    );
  }

  addTicket(): void {
    this.ticketService.addTicket(this.ticket).subscribe(
      (data) => {
        this.tickets.push(data);
        this.ticket = { ticketId: 0, customerId: 0, issueDescription: '', assignedTo: 0, ticketStatus: '', resolutionDate: null };
        this.loadTickets();
      },
      (error) => { 
        console.log(error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('Error: Failed to Add Ticket');
        }}
    );
  }

  deleteTicket(id: number): void {
    this.ticketService.deleteTicket(id).subscribe(
      () => {
        this.loadTickets();
      },
      (error) => { 
        console.log(error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('Error: Failed to Delete Ticket');
        }}
    );
  }

  editTicket(id: number): void {
    this.isEdit = true;
    this.ticketService.getTicketById(id).subscribe(
      (data) => {
        this.ticket = data;
      },
      (error) => { 
        console.log(error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('Error: Failed to Edit Ticket');
        }}
    );
  }

  updateTicket(): void {
    if (this.ticket.ticketId === 0) return;
    this.ticketService.updateTicket(this.ticket.ticketId, this.ticket).subscribe(
      (data) => {
        this.loadTickets();
        this.isEdit = false;
        this.ticket = { ticketId: 0, customerId: 0, issueDescription: '', assignedTo: 0, ticketStatus: '', resolutionDate: null };
      },
      (error) => { 
        console.log(error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('Error: Failed to Update Ticket');
        }}
    );
  }
}
