export interface Opportunity {
    opportunityId: number;       // Primary key for the opportunity
    customerId: number;          // Foreign key to the Customer table
    accountManagerId: number;    // Foreign key to the User table (Account Manager)
    opportunityValue: number;    // Value of the opportunity
    closeDate: Date;             // Expected close date of the opportunity
    stage: string;               // The current stage of the opportunity (e.g., "Prospecting", "Negotiation")
}
  