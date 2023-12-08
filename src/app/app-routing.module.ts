import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './features/customer-list/customer-list.component';
import { CustomerEditComponent } from './features/customer-edit/customer-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    pathMatch: 'full'
  },
  {
    path: 'new',
    component: CustomerEditComponent
  },
  {
    path: 'edit/:id',
    component: CustomerEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
