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
      (error) => { alert('Failed to load tickets!'); }
    );
  }

  addTicket(): void {
    this.ticketService.addTicket(this.ticket).subscribe(
      (data) => {
        this.tickets.push(data);
        this.ticket = { ticketId: 0, customerId: 0, issueDescription: '', assignedTo: 0, ticketStatus: '', resolutionDate: null };
        this.loadTickets();
      },
      (error) => { alert('Failed to add ticket!'); }
    );
  }

  deleteTicket(id: number): void {
    this.ticketService.deleteTicket(id).subscribe(
      () => {
        this.loadTickets();
      },
      (error) => { alert('Failed to delete ticket!'); }
    );
  }

  editTicket(id: number): void {
    this.isEdit = true;
    this.ticketService.getTicketById(id).subscribe(
      (data) => {
        this.ticket = data;
      },
      (error) => { alert('Failed to fetch ticket for editing!'); }
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
      (error) => { alert('Failed to update ticket!'); }
    );
  }
}
