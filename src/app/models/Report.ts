export interface Report {
    reportId: number;         // Primary Key
    type: string;             // Type of the report
    generatedDate: Date;      // Date when the report was generated
    data: string;             // Data content of the report
    createdBy: string;       // The person who created the report
}