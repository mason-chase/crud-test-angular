import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomerComponent } from './components/customer/customer.component';

const routes: Routes = [
  { path: 'create', component: CustomerComponent },
  { path: 'customer-details', component: CustomerDetailsComponent },
  { path: '', redirectTo: 'create', pathMatch: 'full' },
];

export const CustumerRoutes = RouterModule.forChild(routes);
