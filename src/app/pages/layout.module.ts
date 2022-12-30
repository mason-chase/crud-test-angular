import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import {LayoutComponent} from "../layout/layout.component";
import {AsideComponent} from "../layout/components/aside/aside.component";
import {InlineSVGModule} from "ng-inline-svg-2";
import {HttpClientModule} from "@angular/common/http";
import { CustomerComponent } from './customer/customer.component';


@NgModule({
  declarations: [
    LayoutComponent,
    AsideComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    InlineSVGModule,
    HttpClientModule
  ]
})
export class LayoutModule { }
