import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import {CustomersComponent} from "./customers.component";
import {InlineSVGModule} from "ng-inline-svg-2";
import {PipesModule} from "../../core/pipes/pipes.module";
import {HttpClientModule} from "@angular/common/http";
import {CRUDTableModule} from "../../core/shared/crud-table";
import {ReactiveFormsModule} from "@angular/forms";
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';


@NgModule({
  declarations: [
    CustomersComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    InlineSVGModule,
    HttpClientModule,
    CRUDTableModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class CustomersModule { }
