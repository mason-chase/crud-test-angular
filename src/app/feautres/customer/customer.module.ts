import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { CustomerRoutes } from './customer.routing';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutes
  ]
})
export class CustomerModule { }
