export interface MarketingCampaign {
    campaignId: number;          // The primary key for the MarketingCampaigns table
    name: string;                // Name of the campaign
    startDate: Date;             // Start date of the campaign
    endDate: Date;               // End date of the campaign
    targetSegment: string;       // The target segment of the campaign
    budget: number;              // The budget allocated for the campaign
}