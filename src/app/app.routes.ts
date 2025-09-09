import { Routes } from '@angular/router';
import { DashboardComponent } from '../app/dashboard-component/dashboard-component';
import { ShopComponent } from '../app/shop-component/shop-component';
import { CheckoutComponent } from '../app/chechout-component/chechout-component';
import { ProductListComponent } from '../app/product-list/product-list';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'checkout', component: CheckoutComponent },
  
  
  { path: 'category/:categoryName', component: ProductListComponent },


  { path: '', redirectTo: '/shop', pathMatch: 'full' },

  { path: '**', redirectTo: '/shop' }
];
