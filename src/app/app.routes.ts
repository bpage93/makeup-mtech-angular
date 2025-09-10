import { Routes } from '@angular/router';
import { DashboardComponent } from '../app/dashboard-component/dashboard-component';
import { ShopComponent } from '../app/shop-component/shop-component';
import { CheckoutComponent } from '../app/chechout-component/chechout-component';
import { ProductListComponent } from '../app/product-list/product-list';
import { LoginComponent } from '../app/login-component/login-component'; // 1. Import the new component

export const routes: Routes = [
  // 2. Add the new login route
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'category/:categoryName', component: ProductListComponent },

  // 3. Change the default redirect to point to the login page
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // 4. Change the wildcard redirect to also point to the login page
  { path: '**', redirectTo: '/login' }
];
