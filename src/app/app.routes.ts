import { Routes } from '@angular/router';
import { DashboardComponent } from '../app/dashboard-component/dashboard-component';
import { ShopComponent } from '../app/shop-component/shop-component';
import { CheckoutComponent } from './checkout-component/chechout-component';
import { ProductListComponent } from '../app/product-list/product-list';
import { LoginComponent } from './login-component/login-component';
import { SignupComponent } from './signup-component/signup-component'; // Import the new component
import { authGuard, redirectLoggedInGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    
  },
  {
    path: 'signup',
    component: SignupComponent,
    
  }, // Add the new route for signup
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path: 'shop', component: ShopComponent },
  { path: 'checkout', component: CheckoutComponent},
  {
    path: 'category/:categoryName',
    component: ProductListComponent,
   
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
