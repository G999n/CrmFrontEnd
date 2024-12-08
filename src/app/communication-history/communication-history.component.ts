import { Component } from '@angular/core';
import { CommunicationHistory } from '../models/CommunicationHistory';
import { CommunicationHistoryService } from '../services/communicationHistoryService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-communication-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './communication-history.component.html',
  styleUrl: './communication-history.component.css'
})
export class CommunicationHistoryComponent {
  communicationHistory: CommunicationHistory[] = [];
  newCommunication: CommunicationHistory = {
    interactionId: 0, // Ensure interactionId is set to 0 when creating
    customerId: 0,
    interactionType: '',
    date: new Date(),
    notes: '',
    followUpRequired: false
  };
  isEditing: boolean = false;
  editingId: number = 0;

  constructor(private communicationHistoryService: CommunicationHistoryService) { }

  ngOnInit(): void {
    this.getAllCommunicationHistory();
  }

  // Fetch all communication history records
  getAllCommunicationHistory(): void {
    this.communicationHistoryService.getAllCommunicationHistory().subscribe(
      data => {
        this.communicationHistory = data;
      },
      error => {
        console.error('Error fetching communication history', error);
      }
    );
  }

  // Handle form submission (create or update)
  onSubmit(): void {
    if (this.isEditing) {
      this.updateCommunicationHistory();
    } else {
      this.createCommunicationHistory();
    }
  }

  // Create a new communication history record
  createCommunicationHistory(): void {
    // Ensure interactionId is 0 when creating new record
    this.newCommunication.interactionId = 0;

    this.communicationHistoryService.createCommunicationHistory(this.newCommunication).subscribe(
      () => {
        this.getAllCommunicationHistory(); // Refresh the list
        this.resetForm();
      },
      error => {
        console.error('Error creating communication history', error);
      }
    );
  }

  // Update an existing communication history record
  updateCommunicationHistory(): void {
    this.communicationHistoryService.updateCommunicationHistory(this.editingId, this.newCommunication).subscribe(
      () => {
        this.getAllCommunicationHistory(); // Refresh the list
        this.resetForm();
      },
      error => {
        console.error('Error updating communication history', error);
      }
    );
  }

  // Set the form for editing an existing communication history record
  onEdit(history: CommunicationHistory): void {
    this.isEditing = true;
    this.editingId = history.interactionId;
    this.newCommunication = { ...history };
  }

  // Delete a communication history record
  onDelete(id: number): void {
    this.communicationHistoryService.deleteCommunicationHistory(id).subscribe(
      () => {
        this.getAllCommunicationHistory(); // Refresh the list
      },
      error => {
        console.error('Error deleting communication history', error);
      }
    );
  }

  // Reset the form for adding a new communication history
  resetForm(): void {
    this.isEditing = false;
    this.newCommunication = {
      interactionId: 0, // Ensure interactionId is reset to 0 for new records
      customerId: 0,
      interactionType: '',
      date: new Date(),
      notes: '',
      followUpRequired: false
    };
  }
}
