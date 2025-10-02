import { Injectable, inject, signal } from '@angular/core';

import { Router } from '@angular/router';

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth: Auth = inject(Auth);
  router: Router = inject(Router);
  currentUser = signal<User | null>(null);
  user$ = toObservable(this.currentUser);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currentUser.set(user);
      } else {
        this.currentUser.set(null);
      }
    });
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/dashboard']);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async signup(displayName: string, email: string, password: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/dashboard']);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      this.router.navigate(['/dashboard']);
      return result;
    } catch (error) {
      console.error('Google sign-in error', error);
      throw error;
    }
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        throw error;
      });
  }
}
