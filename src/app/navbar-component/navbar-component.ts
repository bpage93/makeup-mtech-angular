import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { CartService } from '../Service/cart-service';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  styleUrls: ['./navbar-component.css'],
  templateUrl: './navbar-component.html',
})
export class NavbarComponent {
  private cartService = inject(CartService);
  private router = inject(Router);
  private authService = inject(AuthService);

  public user = toSignal(this.authService.user$);
  public cartItemCount = toSignal(this.cartService.cartCount$, { initialValue: 0 });

  userMenuItems = [
    { type: 'link', label: 'Profile', icon: 'person', route: '/profile' },
    { type: 'link', label: 'Settings', icon: 'settings', route: '/settings' },
    { type: 'divider' },
    { type: 'link', label: 'Logout', icon: 'logout' },
    { type: 'link', label: 'Makeup', icon: 'face' },
  ];

  dashboardItems = [
    { type: 'link', label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { type: 'link', label: 'Shop', icon: 'shopping_cart', route: '/shop' },
    { type: 'link', label: 'Checkout', icon: 'payment', route: '/checkout' },
  ];

  themes = [
    'light',
    'dark',
    'luxury',
    'cupcake',
    'synthwave',
    'retro',
    'valentine',
    'cyberpunk',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
  ];

  // Add this function inside the NavbarComponent class
  public changeTheme(theme: string): void {
    // Find the <html> element
    const html = document.querySelector('html');
    if (html) {
      // Set the 'data-theme' attribute to the chosen theme
      html.setAttribute('data-theme', theme);
    }
  }
  public logout(): void {
    this.authService.logout();
  }
}
