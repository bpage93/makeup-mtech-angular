import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { toObservable } from '@angular/core/rxjs-interop';

interface UserRoles {
  [key: string]: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth: Auth = inject(Auth);
  router: Router = inject(Router);
  private firestore: Firestore = inject(Firestore);

  currentUser = signal<User | null>(null);
  userRoles = signal<UserRoles>({});
  user$ = toObservable(this.currentUser);

  constructor() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        this.currentUser.set(user);
        this.userRoles.set((idTokenResult.claims as UserRoles) || {});
      } else {
        this.currentUser.set(null);
        this.userRoles.set({});
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
    this.userRoles.set({}); // Clear roles on logout
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
