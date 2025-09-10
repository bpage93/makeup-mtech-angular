import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router'; // Import Router and NavigationEnd
import { NavbarComponent } from './navbar-component/navbar-component';
import { themeChange } from 'theme-change';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent {
  private router = inject(Router);
  public showNavbar = true; // This property will control the navbar's visibility

  constructor() {
    // Restore theme from localStorage on startup
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.querySelector('html')?.setAttribute('data-theme', savedTheme);
    }
    themeChange(false);

    // Subscribe to router events to check the URL
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects;
        // Check if the current URL is '/login' OR '/signup'
        if (currentUrl === '/login' || currentUrl === '/signup') {
          this.showNavbar = false; // Hide the navbar
        } else {
          this.showNavbar = true; // Show the navbar on all other pages
        }
      });
  }
}
