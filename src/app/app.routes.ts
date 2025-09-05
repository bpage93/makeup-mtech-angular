import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { ShopComponent } from './shop-component/shop-component';
import { ChechoutComponent } from './chechout-component/chechout-component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'checkout', component: ChechoutComponent },
];
