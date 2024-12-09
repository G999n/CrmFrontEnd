import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Opportunity } from '../models/Opportunity';
import { OpportunityService } from '../services/opportunityService';

@Component({
  selector: 'app-opportunity',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './opportunity.component.html',
  styleUrl: './opportunity.component.css'
})
export class OpportunityComponent {
  opportunities: Opportunity[] = [];
  opportunity: Opportunity = { opportunityId: 0, customerId: 0, accountManagerId: 0, opportunityValue: 0, closeDate: new Date(), stage: '' };
  isEditing = false;

  constructor(private opportunityService: OpportunityService) {}

  ngOnInit() {
    this.loadOpportunities();
  }

  loadOpportunities() {
    this.opportunityService.getAll().subscribe({
      next: (data) => this.opportunities = data,
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('Error: Failed to Load Opportunities');
        }
      }
    });
  }

  addOpportunity() {
    this.opportunityService.create(this.opportunity).subscribe({
      next: () => {
        this.loadOpportunities();
        this.opportunity = { opportunityId: 0, customerId: 0, accountManagerId: 0, opportunityValue: 0, closeDate: new Date(), stage: '' };
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('Error: Failed to Add Opportunity');
        }
      }
    });
  }

  editOpportunity(id: number) {
    this.opportunityService.getById(id).subscribe({
      next: (data) => {
        this.opportunity = data;
        this.isEditing = true;
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('Error: Failed to Edit Opportunity');
        }
      }
    });
  }

  updateOpportunity() {
    this.opportunityService.update(this.opportunity.opportunityId, this.opportunity).subscribe({
      next: () => {
        this.loadOpportunities();
        this.isEditing = false;
        this.opportunity = { opportunityId: 0, customerId: 0, accountManagerId: 0, opportunityValue: 0, closeDate: new Date(), stage: '' };
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('Error: Failed to Update Opportunity');
        }
      }
    });
  }

  deleteOpportunity(id: number) {
    this.opportunityService.delete(id).subscribe({
      next: () => this.loadOpportunities(),
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('Error: Failed to Delete Opportunity');
        }
      }
    });
  }
}
