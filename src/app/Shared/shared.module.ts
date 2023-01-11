import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// import primeng packages
import { InputTextModule } from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';

const Import_Export_PackagePrimeng = [InputTextModule , CalendarModule]
const Import_Export_PackagePrimeng = [InputTextModule, CalendarModule, ButtonModule, ToastModule , InputNumberModule]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Import_Export_PackagePrimeng
  ],
  exports: [Import_Export_PackagePrimeng]
})
export class SharedModule { }
