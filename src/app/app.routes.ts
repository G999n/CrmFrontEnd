import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CommunicationHistoryComponent } from "./communication-history/communication-history.component";
import { CustomerComponent } from './customer/customer.component';
import { LeadComponent } from './lead/lead.component';
import { MarketingCampaignComponent } from './marketing-campaign/marketing-campaign.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { SupportTicketComponent } from './support-ticket/support-ticket.component';
import { TaskComponent } from './task/task.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'communication-history', component: CommunicationHistoryComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'leads', component: LeadComponent },
  { path: 'marketing-campaigns', component: MarketingCampaignComponent },
  { path: 'opportunities', component: OpportunityComponent },
  { path: 'support-tickets', component: SupportTicketComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'users', component: UserComponent },
  { path: '', component: HomeComponent}
];
