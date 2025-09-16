import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  // Stub login method
  async login(email: string, password: string): Promise<void> {
    // Implement your own auth logic here
    this.router.navigate(['/dashboard']);
  }

  // Stub logout method
  async logout(): Promise<void> {
    // Implement your own logout logic here
    this.router.navigate(['/login']);
  }
}
