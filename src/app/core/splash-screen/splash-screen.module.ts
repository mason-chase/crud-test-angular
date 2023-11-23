import {NgModule} from '@angular/core';
import {SplashScreenComponent} from './splash-screen.component';
import {CommonModule} from '@angular/common';
import {InlineSVGModule} from 'ng-inline-svg-2';

@NgModule({
  declarations: [
    SplashScreenComponent
  ],
  exports: [
    SplashScreenComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule
  ]
})

export class SplashScreenModule {

}
