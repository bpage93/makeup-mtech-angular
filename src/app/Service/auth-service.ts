import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  // Use a BehaviorSubject to keep track of the current user state
  public currentUser = new BehaviorSubject<User | null>(null);

  constructor() {
    // Listen to Firebase's auth state changes
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.next(user);
    });
  }

  // --- Sign Up ---
  async signUp(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      if (userCredential.user) {
        this.router.navigate(['/shop']); // Redirect to shop after successful signup
        return userCredential.user;
      }
      return null;
    } catch (error) {
      console.error('Sign up failed:', error);
      return null;
    }
  }

  // --- Login ---
  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      if (userCredential.user) {
        this.router.navigate(['/shop']); // Redirect to shop after successful login
        return userCredential.user;
      }
      return null;
    } catch (error) {
      console.error('Login failed:', error);
      return null;
    }
  }

  // --- Logout ---
  async logout(): Promise<void> {
    await signOut(this.auth);
    this.router.navigate(['/login']); // Redirect to login after logout
  }
}