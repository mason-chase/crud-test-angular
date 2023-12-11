import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer/list/customer-list.component';
import { NgModule } from '@angular/core';
import { CustomerCreateComponent } from './customer/create/customer-create.component';
import { CustomerUpdateComponent } from './customer/update/customer-update.component';

const routes: Routes = [
  {
    path: 'customer',
    children: [
      { path: 'list', component: CustomerListComponent },
      { path: 'create', component: CustomerCreateComponent },
      { path: 'update/:id', component: CustomerUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PagesRoutingModule {}
