import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './signup-component.html',
  styleUrls: ['./signup-component.css']
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public hidePassword = true;
  errorMessage: string | null = null;

  signupForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  async signup() {
    this.errorMessage = null;
    if (this.signupForm.invalid) {
      return;
    }

    const { email, password } = this.signupForm.value;
    try {
      await this.authService.signup(email, password);
    } catch (error: any) {
      this.errorMessage = error.message;
      console.error('Signup failed:', error);
    }
  }
}
