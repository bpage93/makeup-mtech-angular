import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import anime from 'animejs/lib/anime.es.js';

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
  private router = inject(Router);

  public hidePassword = true;

  signupForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  signup(): void {
    if (this.signupForm.valid) {
      console.log('Signup successful for:', this.signupForm.value);
      this.router.navigate(['/shop']);
    } else {
      console.error('Signup form is invalid');
      this.signupForm.markAllAsTouched();
    }
  }
}