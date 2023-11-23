import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers.component";
import {CreateCustomerComponent} from "./components/create-customer/create-customer.component";
import {UpdateCustomerComponent} from "./components/update-customer/update-customer.component";

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  },
  {
    path: 'create',
    component: CreateCustomerComponent
  },
  {
    path: 'update/:id',
    component: UpdateCustomerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
