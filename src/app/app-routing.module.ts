import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudCustomerComponent } from './crud-customer/crud-customer.component';

const routes: Routes = [
  {
    path:'customer',
    component:CrudCustomerComponent
  },
  {
    path: '',
    redirectTo:'/customer',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
