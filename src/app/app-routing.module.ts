import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddCustomerComponent} from "./customer/add-customer/add-customer.component";


const routes: Routes = [

  {
    path: '',

    redirectTo: 'main',
    pathMatch: 'full'
  },

  {path: 'add', component: AddCustomerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
