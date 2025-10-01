import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private http = inject(HttpClient);

  createPaymentIntent(amount: number): Promise<{ clientSecret: string }> {
    // Replace with your actual cloud function URL
    const url = 'YOUR_CLOUD_FUNCTION_URL_HERE';
    return firstValueFrom(this.http.post<{ clientSecret: string }>(url, { amount }));
  }
}
