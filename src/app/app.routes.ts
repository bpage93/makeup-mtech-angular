import { Routes } from '@angular/router';
import { DashboardComponent } from '../app/dashboard-component/dashboard-component';
import { ShopComponent } from '../app/shop-component/shop-component';
import { CheckoutComponent } from './checkout-component/chechout-component';
import { ProductListComponent } from '../app/product-list/product-list';
import { LoginComponent } from './login-component/login-component';
import { SignupComponent } from './signup-component/signup-component';
import { ProfileComponent } from './profile-component/profile-component';
import { SettingsComponent } from './settings-component/settings-component';

export const routes: Routes = [
  // Routes for login and signup
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },

  // Public application routes
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'shop',
    component: ShopComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'category/:categoryName',
    component: ProductListComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },

  // Default and wildcard routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
