import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddCustomerComponent} from "./customer/add-customer/add-customer.component";
import {CustomerListComponent} from "./customer/customer-list/customer-list.component";


const routes: Routes = [

  {
    path: '',

    redirectTo: 'main',
    pathMatch: 'full'
  },

  {path: 'add', component: AddCustomerComponent},
  {path: 'list', component: CustomerListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
