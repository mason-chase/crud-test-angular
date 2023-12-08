import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomerModule } from './features/customer.module';
import { SharedModule } from './shared/shared.module';
import { initializeApp } from './app-initializer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CustomerModule
  ],
  providers: [
    {
    provide: APP_INITIALIZER,
    useFactory: () => initializeApp,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
