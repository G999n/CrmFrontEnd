export interface CommunicationHistory {
    interactionId: number;        // Primary key for the communication record
    customerId: number;           // Foreign key reference to the Customer table
    interactionType: string;      // Type of interaction (e.g., Email, Call, Meeting)
    date: Date;                   // Date of the interaction
    notes: string;                // Notes or details of the interaction
    followUpRequired: boolean;    // Indicates if follow-up is required
  }