import { Component } from '@angular/core';
import { Lead } from '../models/Lead';
import { LeadService } from '../services/leadService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lead',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lead.component.html',
  styleUrl: './lead.component.css'
})
export class LeadComponent {
  leads: Lead[] = [];
  newLead: Lead = {
    leadId: 0,
    leadSource: '',
    name: '',
    contactDetails: '',
    leadStatus: '',
    assignedTo: 0,
    potentialValue: 0,
    isConverted: false
  };
  editingLead: Lead | null = null;  // To store the lead being edited
  leadToEdit: Lead = { ...this.newLead };  // Holds either newLead or editingLead

  constructor(private leadService: LeadService) {}

  ngOnInit(): void {
    this.getLeads();
    this.leadToEdit = { ...this.newLead }; // Initialize leadToEdit with newLead's structure
  }

  // Get all leads
  getLeads(): void {
    this.leadService.getAllLeads().subscribe(
      (data: Lead[]) => {
        this.leads = data;
      },
      (error) => {
        alert('Failed to load leads.');
      }
    );
  }

  // Add a new lead
  addLead(): void {
    this.leadService.addLead(this.leadToEdit).subscribe(
      (data: Lead) => {
        this.getLeads(); // Refresh the list
        this.resetForm(); // Reset the form after adding
      },
      (error) => {
        alert('Failed to add the lead.');
      }
    );
  }

  // Delete a lead
  deleteLead(id: number): void {
    this.leadService.deleteLead(id).subscribe(
      () => {
        this.getLeads(); // Refresh the list
      },
      (error) => {
        alert('Failed to delete the lead.');
      }
    );
  }

  // Convert a lead
  convertLead(id: number): void {
    this.leadService.convertLead(id).subscribe(
      () => {
        this.getLeads(); // Refresh the list
      },
      (error) => {
        alert('Failed to convert the lead.');
      }
    );
  }

  // Start editing a lead
  editLead(id: number): void {
    this.leadService.getLeadById(id).subscribe(
      (data: Lead) => {
        this.editingLead = { ...data }; // Copy the lead data into editingLead
        this.leadToEdit = { ...this.editingLead }; // Assign editingLead to leadToEdit
      },
      (error) => {
        alert('Failed to fetch lead details for editing.');
      }
    );
  }

  // Update the edited lead
  updateLead(): void {
    if (this.leadToEdit) {
      this.leadService.updateLead(this.leadToEdit.leadId, this.leadToEdit).subscribe(
        () => {
          this.getLeads(); // Refresh the list
          this.resetForm(); // Reset form after update
        },
        (error) => {
          alert('Failed to update the lead.');
        }
      );
    }
  }

  // Reset the form
  resetForm(): void {
    this.leadToEdit = { ...this.newLead }; // Reset to a fresh lead object
    this.editingLead = null;
  }
}
