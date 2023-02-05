import { Router, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer-manage/customer-manage.module').then(
        (m) => m.CustomerManageModule
      ),
  },
  { path: '**', redirectTo: 'customer', pathMatch: 'full' },
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
];

export const AppRoutes = RouterModule.forRoot(routes);
