import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CommunicationHistoryComponent } from "./communication-history/communication-history.component";
import { CustomerComponent } from './customer/customer.component';
import { LeadComponent } from './lead/lead.component';
import { MarketingCampaignComponent } from './marketing-campaign/marketing-campaign.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { SupportTicketComponent } from './support-ticket/support-ticket.component';
import { TaskComponent } from './task/task.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, TaskComponent, SupportTicketComponent, OpportunityComponent, MarketingCampaignComponent, LeadComponent, UserComponent, CommunicationHistoryComponent, CustomerComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CrmFrontend';
}
