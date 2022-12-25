import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { CustomerManageModule } from './customer-manage/customer-manage.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CustomerManageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
