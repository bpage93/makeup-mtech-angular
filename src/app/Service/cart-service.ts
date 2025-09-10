import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { MakeupProduct } from '../interface/makeup-product';

// We'll create a new interface for items in the cart to track quantity
export interface CartItem {
  product: MakeupProduct;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // A BehaviorSubject holds the current list of cart items and notifies subscribers of changes
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  // An observable that components can subscribe to for the total item count
  public cartCount$ = this.cartItems.asObservable().pipe(
    map(items => items.reduce((acc, item) => acc + item.quantity, 0))
  );

  // An observable for the full list of cart items
  public cartItems$ = this.cartItems.asObservable();

  addItem(productToAdd: MakeupProduct): void {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.product.id === productToAdd.id);

    if (existingItem) {
      // If item already exists in cart, just increase its quantity
      existingItem.quantity++;
    } else {
      // Otherwise, add the new product to the cart with a quantity of 1
      currentItems.push({ product: productToAdd, quantity: 1 });
    }

    // Push the updated list back into the BehaviorSubject to notify all subscribers
    this.cartItems.next([...currentItems]);
  }
}