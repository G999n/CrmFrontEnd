import { Component } from '@angular/core';
import { MarketingCampaign } from '../models/MarketingCampaign';
import { MarketingCampaignService } from '../services/marketingCampaignService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marketing-campaign',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './marketing-campaign.component.html',
  styleUrl: './marketing-campaign.component.css'
})
export class MarketingCampaignComponent {
  campaigns: MarketingCampaign[] = [];
  campaign: MarketingCampaign = {
    campaignId: 0,
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    targetSegment: '',
    budget: 0,
  };
  isEdit: boolean = false;

  constructor(private marketingCampaignService: MarketingCampaignService) {}

  ngOnInit(): void {
    this.getAllCampaigns();
  }

  getAllCampaigns(): void {
    this.marketingCampaignService.getAll().subscribe(
      (data) => {
        this.campaigns = data;
      },
      (error) => {
        console.log(error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('Error: Failed to Get Campaigns!');
        }
      }
    );
  }

  addCampaign(): void {
    this.marketingCampaignService.create(this.campaign).subscribe(
      (data) => {
        this.campaigns.push(data);
        this.resetForm();
      },
      (error) => {
        console.log(error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('Error: Failed to add campaign');
        }
      }
    );
  }

  editCampaign(id: number): void {
    this.marketingCampaignService.getById(id).subscribe((data) => {
      this.campaign = data;
      this.isEdit = true;
    });
  }

  updateCampaign(): void {
    this.marketingCampaignService
      .update(this.campaign.campaignId, this.campaign)
      .subscribe(
        (data) => {
          const index = this.campaigns.findIndex(
            (campaign) => campaign.campaignId === data.campaignId
          );
          this.campaigns[index] = data;
          this.resetForm();
          this.isEdit = false;
        },
        (error) => {
          console.log(error);
          if (error.status === 401) {
            alert('Unauthorized: Please log in!');
          } else if (error.status === 403) {
            alert('Forbidden: You do not have permission to perform this action!');
          } else {
            alert('Error failed to update campaign.');
          }
        }
      );
  }

  deleteCampaign(id: number): void {
    this.marketingCampaignService.delete(id).subscribe(
      () => {
        this.campaigns = this.campaigns.filter(
          (campaign) => campaign.campaignId !== id
        );
      },
      (error) => {
        console.log(error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in!');
        } else if (error.status === 403) {
          alert('Forbidden: You do not have permission to perform this action!');
        } else {
          alert('Error! Failed to delete campaign.');
        }
      }
    );
  }

  resetForm(): void {
    this.campaign = {
      campaignId: 0,
      name: '',
      startDate: new Date(),
      endDate: new Date(),
      targetSegment: '',
      budget: 0,
    };
  }
}
