import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { ShopComponent } from '../app/shop-component/shop-component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'shop', component: ShopComponent },
];
