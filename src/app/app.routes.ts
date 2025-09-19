import { Routes } from '@angular/router';

export const routes: Routes = [
  // Routes for login and signup
  {
    path: 'login',
    loadComponent: () => import('./login-component/login-component').then(m => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup-component/signup-component').then(m => m.SignupComponent),
  },

  // Public application routes
  {
    path: 'dashboard',
    loadComponent: () => import('../app/dashboard-component/dashboard-component').then(m => m.DashboardComponent),
  },
  {
    path: 'shop',
    loadComponent: () => import('../app/shop-component/shop-component').then(m => m.ShopComponent),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./checkout-component/chechout-component').then(m => m.CheckoutComponent),
  },
  {
    path: 'category/:categoryName',
    loadComponent: () => import('../app/product-list/product-list').then(m => m.ProductListComponent),
  },

  // Default and wildcard routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
