import { Component, inject, AfterViewInit, ElementRef, ViewChild, HostListener} from '@angular/core';
import anime from 'animejs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

// --- ANGULAR MATERIAL IMPORTS ---
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// --- SERVICE IMPORTS ---
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './login-component.html',
})
export class LoginComponent implements AfterViewInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService); 

  errorMessage: string | null = null;

  constructor(private elementRef: ElementRef) {}

  // Use @ViewChild to get a reference to the element with #imagePanel
  @ViewChild('imagePanel') imagePanelRef!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.animateParallax();
  }

  // Add the animateParallax method to handle parallax animation
  animateParallax(): void {
    // Example parallax effect: move the imagePanel based on scroll position
    if (this.imagePanelRef && this.imagePanelRef.nativeElement) {
      const scrollY = window.scrollY || window.pageYOffset;
      this.imagePanelRef.nativeElement.style.transform = `translateY(${scrollY * 0.2}px)`;
    }
  }

  ngAfterViewInit(): void {
    // The element reference is now available after the view has been initialized
    if (this.imagePanelRef) {
      anime({
        targets: this.imagePanelRef.nativeElement, // Access the native DOM element
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 1100,
        easing: 'easeOutQuad',
        delay: 200, // Optional: add a slight delay
      });
    }

    // Text animation for "Welcome Back"
    const welcomeText: HTMLElement | null = this.elementRef.nativeElement.querySelector('.card-title');
    if (welcomeText && welcomeText.children) {
      // You'll need to manually wrap the text in spans, as shown above, or use a library that does it for you
      anime({
        targets: welcomeText.children, // Targets the child span elements
        opacity: [0, 1],
        translateY: [20, 0], // Optional: makes the letters slide up as they fade in
        easing: 'easeOutQuad',
        duration: 800,
        delay: anime.stagger(50), // This creates the staggered effect, with a 50ms delay between each target
      });
    }
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  async onLogin() {
    this.errorMessage = null;
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    try {
      await this.authService.login(email, password);
    } catch (error: any) {
      this.errorMessage = error.message;
      console.error('Login failed:', error);
    }
  }
}
