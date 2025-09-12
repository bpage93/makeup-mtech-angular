import { Routes } from '@angular/router';
import { DashboardComponent } from '../app/dashboard-component/dashboard-component';
import { ShopComponent } from '../app/shop-component/shop-component';
import { CheckoutComponent } from '../app/chechout-component/chechout-component';
import { ProductListComponent } from '../app/product-list/product-list';
import { LoginComponent } from './login-component/login-component';
import { SignupComponent } from './signup-component/signup-component'; // Import the new component
import { authGuard, redirectLoggedInGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [redirectLoggedInGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [redirectLoggedInGuard],
  }, // Add the new route for signup
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'shop', component: ShopComponent, canActivate: [authGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  {
    path: 'category/:categoryName',
    component: ProductListComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
