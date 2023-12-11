import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { CustomerListComponent } from './customer/list/customer-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerCreateComponent } from './customer/create/customer-create.component';
import { CustomerFormComponent } from '../shared/components/customer/customer-form.component';
import { CustomerUpdateComponent } from './customer/update/customer-update.component';

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerCreateComponent,
    CustomerFormComponent,
    CustomerUpdateComponent,
  ],
  imports: [PagesRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class PagesModule {}
