import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import {InfoComponent} from "./component/info.component";
import {ReactiveFormsModule} from "@angular/forms";
import { EmailValidatorDirective } from './util/email-validator.directive';


@NgModule({
  declarations: [
    CustomerComponent,
    InfoComponent,
    EmailValidatorDirective
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
