import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ErrorsComponent} from "./errors.component";
import {Error1Component} from "./error1/error1.component";

const routes: Routes = [
  {
    path: '',
    component: ErrorsComponent,
    children: [
      {
        path: '404',
        component: Error1Component
      },
      {
        path: '**',
        component: Error1Component,
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
