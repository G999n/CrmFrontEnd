export interface Lead {
    leadId: number;              // Maps to LeadId (Primary Key)
    leadSource: string;          // Maps to LeadSource
    name: string;                // Maps to Name
    contactDetails: string;      // Maps to ContactDetails
    leadStatus: string;          // Maps to LeadStatus
    assignedTo: number;          // Maps to AssignedTo (Foreign Key to User ID)
    potentialValue: number;      // Maps to PotentialValue
    isConverted: boolean;        // Maps to IsConverted
  }