export interface SupportTicket {
    ticketId: number;           // Primary key for the support ticket
    customerId: number;         // Foreign key to the Customer table
    issueDescription: string;   // Description of the issue reported
    assignedTo: number;         // Foreign key to the User table (Assigned Support Agent)
    ticketStatus: string;       // Status of the ticket (e.g., Open, Closed, In Progress)
    resolutionDate: Date | null; // Date      // The date when the ticket was resolved (nullable)
}