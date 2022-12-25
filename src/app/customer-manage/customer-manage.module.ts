import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustumerRoutes } from './customer.routing';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CustomerComponent,
    CustomerDetailsComponent
  ],
  imports: [
    CommonModule,
    CustumerRoutes,
    SharedModule
  ]
})
export class CustomerManageModule { }
