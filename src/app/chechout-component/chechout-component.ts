import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  template: `
    <div class="bg-base-200 min-h-screen p-4 sm:p-8">
      <div class="container mx-auto max-w-6xl">
        <h1 class="text-4xl font-bold mb-8 text-center">Checkout</h1>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <!-- Left Side: Stepper Form -->
          <div class="lg:col-span-2 bg-base-100 p-6 rounded-lg shadow-lg">
            <mat-stepper orientation="vertical" [linear]="true" #stepper>
              <!-- Step 1: Shipping Information -->
              <mat-step [stepControl]="shippingForm">
                <form [formGroup]="shippingForm">
                  <ng-template matStepLabel>Fill out your shipping address</ng-template>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <mat-form-field appearance="fill" class="w-full">
                      <mat-label>First Name</mat-label>
                      <input matInput formControlName="firstName" required>
                      <mat-error *ngIf="shippingForm.get('firstName')?.hasError('required')">First name is required</mat-error>
                    </mat-form-field>
                    
                    <mat-form-field appearance="fill" class="w-full">
                      <mat-label>Last Name</mat-label>
                      <input matInput formControlName="lastName" required>
                      <mat-error *ngIf="shippingForm.get('lastName')?.hasError('required')">Last name is required</mat-error>
                    </mat-form-field>
                  </div>

                  <mat-form-field appearance="fill" class="w-full mt-4">
                    <mat-label>Shipping Address</mat-label>
                    <input matInput formControlName="address" required>
                     <mat-error *ngIf="shippingForm.get('address')?.hasError('required')">Address is required</mat-error>
                  </mat-form-field>

                  <div class="mt-4 flex justify-end">
                    <button mat-raised-button color="primary" matStepperNext>Next</button>
                  </div>
                </form>
              </mat-step>

              <!-- Step 2: Payment Details -->
              <mat-step [stepControl]="paymentForm">
                <form [formGroup]="paymentForm">
                  <ng-template matStepLabel>Fill out payment information</ng-template>
                  
                  <mat-form-field appearance="fill" class="w-full">
                    <mat-label>Card Number</mat-label>
                    <input matInput formControlName="cardNumber" placeholder="1234-5678-9123-4567" required>
                    <mat-icon matSuffix>credit_card</mat-icon>
                    <mat-error *ngIf="paymentForm.get('cardNumber')?.hasError('required')">Card number is required</mat-error>
                  </mat-form-field>

                  <div class="grid grid-cols-2 gap-4 mt-4">
                    <mat-form-field appearance="fill" class="w-full">
                      <mat-label>Expiry Date</mat-label>
                      <input matInput formControlName="expiryDate" placeholder="MM/YY" required>
                       <mat-error *ngIf="paymentForm.get('expiryDate')?.hasError('required')">Expiry date is required</mat-error>
                    </mat-form-field>
                    <mat-form-field appearance="fill" class="w-full">
                      <mat-label>CVC</mat-label>
                      <input matInput formControlName="cvc" placeholder="123" required>
                      <mat-error *ngIf="paymentForm.get('cvc')?.hasError('required')">CVC is required</mat-error>
                    </mat-form-field>
                  </div>

                  <div class="mt-4 flex justify-between">
                    <button mat-button matStepperPrevious>Back</button>
                    <button mat-raised-button color="primary" matStepperNext>Next</button>
                  </div>
                </form>
              </mat-step>

              <!-- Step 3: Review and Confirm -->
              <mat-step>
                <ng-template matStepLabel>Review and Confirm</ng-template>
                <p class="mb-4">You are now ready to complete your order. Please review the details before confirming.</p>
                <div class="flex justify-between">
                  <button mat-button matStepperPrevious>Back</button>
                  <button mat-raised-button color="primary" (click)="submitOrder()">Place Order</button>
                </div>
              </mat-step>
            </mat-stepper>
          </div>

          <!-- Right Side: Order Summary -->
          <div class="lg:col-span-1">
            <div class="card bg-base-100 shadow-lg">
              <div class="card-body">
                <h2 class="card-title text-2xl">Order Summary</h2>
                <ul class="space-y-4 my-4">
                  @for(item of cartItems; track item.id) {
                    <li class="flex justify-between items-center">
                      <div class="flex items-center">
                        <img [src]="item.imageUrl" [alt]="item.name" class="w-16 h-16 rounded-lg mr-4 object-cover">
                        <div>
                          <p class="font-semibold">{{item.name}}</p>
                          <p class="text-sm text-base-content/70">Qty: {{item.quantity}}</p>
                        </div>
                      </div>
                      <p class="font-semibold">\${{ (item.price * item.quantity).toFixed(2) }}</p>
                    </li>
                  }
                </ul>
                <mat-divider></mat-divider>
                <div class="space-y-2 mt-4">
                  <div class="flex justify-between"><span>Subtotal</span><span>\${{subtotal.toFixed(2)}}</span></div>
                  <div class="flex justify-between"><span>Shipping</span><span>\${{shipping.toFixed(2)}}</span></div>
                  <div class="flex justify-between font-bold text-lg"><span>Total</span><span>\${{total.toFixed(2)}}</span></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);

  // --- FORM DEFINITIONS ---
  shippingForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required]
  });

  paymentForm: FormGroup = this.fb.group({
    cardNumber: ['', Validators.required],
    expiryDate: ['', Validators.required],
    cvc: ['', Validators.required]
  });
  
  // --- ORDER SUMMARY DATA (Sample Data) ---
  cartItems = [
    { id: 1, name: 'Lipstick - Red Velvet', price: 12.50, quantity: 1, imageUrl: 'https://placehold.co/100x100/be123c/ffffff?text=L' },
    { id: 2, name: 'Eyeliner - Midnight', price: 8.00, quantity: 2, imageUrl: 'https://placehold.co/100x100/1f2937/ffffff?text=E' }
  ];

  subtotal = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  shipping = 5.00;
  total = this.subtotal + this.shipping;

  // --- FORM SUBMISSION ---
  submitOrder() {
    if (this.shippingForm.valid && this.paymentForm.valid) {
      console.log('Order Submitted!');
      console.log('Shipping Info:', this.shippingForm.value);
      console.log('Payment Info:', this.paymentForm.value);
      // Here you would typically send the data to a backend server
      alert('Thank you for your order!');
    } else {
      console.error('Form is invalid');
      // Mark all fields as touched to show validation errors
      this.shippingForm.markAllAsTouched();
      this.paymentForm.markAllAsTouched();
    }
  }
}