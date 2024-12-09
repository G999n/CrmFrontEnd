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
import { AuthGuard} from './auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'communication-history', component: CommunicationHistoryComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomerComponent, canActivate: [AuthGuard] },
  { path: 'leads', component: LeadComponent, canActivate: [AuthGuard] },
  { path: 'marketing-campaigns', component: MarketingCampaignComponent, canActivate: [AuthGuard] },
  { path: 'opportunities', component: OpportunityComponent, canActivate: [AuthGuard] },
  { path: 'support-tickets', component: SupportTicketComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: "full"},
  { path: '*', redirectTo: '/login'}
];
