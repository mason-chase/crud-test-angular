import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: 'create', component: MainComponent },
  { path: '**', redirectTo: 'create', pathMatch: 'full' },
  { path: '', redirectTo: 'create', pathMatch: 'full' }
];

export const CustomerRoutes = RouterModule.forChild(routes);
