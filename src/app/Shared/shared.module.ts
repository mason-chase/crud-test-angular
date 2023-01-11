import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// import primeng packages
import { InputTextModule } from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';

const Import_Export_PackagePrimeng = [InputTextModule , CalendarModule]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Import_Export_PackagePrimeng
  ],
  exports: [Import_Export_PackagePrimeng]
})
export class SharedModule { }
