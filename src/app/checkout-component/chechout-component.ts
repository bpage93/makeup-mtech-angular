import { Component, inject, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map, of, firstValueFrom } from 'rxjs';
import { CartService, CartItem } from '../Service/cart-service';
import { PaymentService } from '../Service/payment.service'; // Import PaymentService

// --- STRIPE IMPORTS ---
import { loadStripe, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';

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
    MatDividerModule,
  ],
  templateUrl: './chechout-component.html',
})
export class CheckoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardElement') cardElement!: ElementRef;

  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private paymentService = inject(PaymentService); // Inject PaymentService
  public parseFloat = parseFloat;

  // --- STRIPE PROPERTIES ---
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  cardError: string | null = null;
  isLoading = false;

  // --- FORM DEFINITIONS ---
  shippingForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
  });

  // Payment form is now handled by Stripe Elements, but we keep a group for stepper control
  paymentForm: FormGroup = this.fb.group({});

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

  async ngAfterViewInit() {
    // Replace with your actual publishable key
    const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');
    this.stripe = await stripePromise;
    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount(this.cardElement.nativeElement);
      this.card.on('change', (event) => {
        this.cardError = event.error ? event.error.message : null;
      });
    }
  }

  ngOnDestroy() {
    this.card?.destroy();
  }

  // --- FORM SUBMISSION ---
  async submitOrder() {
    if (this.shippingForm.invalid || !this.stripe || !this.card) {
      console.error('Form is invalid or Stripe is not initialized.');
      this.shippingForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const total = await firstValueFrom(this.total$);
    const amountInCents = Math.round(total * 100);

    try {
      const { clientSecret } = await this.paymentService.createPaymentIntent(amountInCents);

      const result = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: this.card,
          billing_details: {
            name: `${this.shippingForm.value.firstName} ${this.shippingForm.value.lastName}`,
          },
        },
      });

      if (result.error) {
        this.cardError = result.error.message || 'An unknown error occurred.';
        this.isLoading = false;
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log('Payment successful!');
          alert('Thank you for your order!');
          this.cartService.clearCart();
          // Optionally, navigate to an order confirmation page
        }
      }
    } catch (error) {
      console.error('Error during payment process:', error);
      this.cardError = 'Failed to process payment. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}
