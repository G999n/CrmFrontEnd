export interface SalesPipeline {
    pipelineId: number;         // Primary key for the sales pipeline
    leadId: number;             // Foreign key to the Lead table
    stage: string;              // Current stage of the pipeline (e.g., Qualification, Proposal, Negotiation)
    estimatedValue: number;     // Estimated value of the sale or deal
    closingDate: Date;          // Expected closing date of the deal
    status: string;             // Status of the pipeline (e.g., Active, Closed, Won, Lost)
}