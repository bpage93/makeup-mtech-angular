import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MakeupService } from '../Service/makeupService';
import { MakeupProduct } from '../interface/makeup-product';
import { CartService } from '../Service/cart-service';
import { Observable, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent {
  private route = inject(ActivatedRoute);
  private makeupService = inject(MakeupService);
  private cartService = inject(CartService); 

  public products$: Observable<MakeupProduct[]>;
  public categoryName$: Observable<string>;

  constructor() {
    // Create an observable stream for the category name from the URL parameter
    this.categoryName$ = this.route.paramMap.pipe(
      map(params => params.get('categoryName') || '')
    );

    // Create a stream for the products.
    // Use switchMap to switch to a new observable (the product list) whenever the category name changes.
    this.products$ = this.categoryName$.pipe(
      switchMap(categoryName => this.makeupService.getProductsForCategory(categoryName))
    );
  }

  addToCart(product: MakeupProduct): void {
    this.cartService.addItem(product);
    alert(`${product.name} has been added to your cart.`);
  }
}