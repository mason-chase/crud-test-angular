import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { CustomerRoutes } from './customer.routing';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CustomerService } from './services/customer.service';

@NgModule({
  declarations: [
    MainComponent,
    CreateCustomerComponent,
    CustomersListComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutes,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule
  ],
  providers:[
    CustomerService
  ]
})
export class CustomerModule { }
