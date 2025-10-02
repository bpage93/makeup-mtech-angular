import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// CLEANED: Removed duplicate FormBuilder, FormGroup, etc. import
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { CartService, CartItem } from '../Service/cart-service'; // Note: Ensure filename is cart.service.ts

// --- ANGULAR MATERIAL IMPORTS ---
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatDividerModule
  ],
  templateUrl: './chechout-component.html',
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  public parseFloat = parseFloat;

  // --- FORM DEFINITIONS ---
  shippingForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
  });

  paymentForm: FormGroup = this.fb.group({
    cardNumber: ['', Validators.required],
    expiryDate: ['', Validators.required],
    cvc: ['', Validators.required],
  });

  // --- ORDER SUMMARY DATA ---
  public cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;
  public shippingCost$: Observable<number> = of(5.0); // Shipping cost as an observable

  public subtotal$: Observable<number> = this.cartItems$.pipe(
    map((items) =>
      items.reduce((acc, item) => acc + parseFloat(item.product.price || '0') * item.quantity, 0)
    )
  );

  public total$: Observable<number> = this.subtotal$.pipe(
    map((subtotal) => subtotal + 5.0) // Assumes a fixed shipping cost
  );

  // --- FORM SUBMISSION ---
  submitOrder() {
    if (this.shippingForm.valid && this.paymentForm.valid) {
      console.log('Order Submitted!');
      console.log('Shipping Info:', this.shippingForm.value);
      console.log('Payment Info:', this.paymentForm.value);
      alert('Thank you for your order!');
    } else {
      console.error('Form is invalid');
      this.shippingForm.markAllAsTouched();
      this.paymentForm.markAllAsTouched();
    }
  }
}