import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {LayoutComponent} from "../layout/layout.component";
import {AsideComponent} from "../layout/components/aside/aside.component";
import {InlineSVGModule} from "ng-inline-svg-2";
import {HttpClientModule} from "@angular/common/http";
import {CRUDTableModule} from "../core/shared/crud-table";
import {ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../core/pipes/pipes.module";


@NgModule({
  declarations: [
    LayoutComponent,
    AsideComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    InlineSVGModule,
    HttpClientModule,
    CRUDTableModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class LayoutModule {
}
