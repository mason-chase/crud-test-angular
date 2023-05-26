import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CrudCustomerComponent } from './crud-customer/crud-customer.component';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DescriptionComponent } from './description/description.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudCustomerComponent,
    CustomerDialogComponent,
    DescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
