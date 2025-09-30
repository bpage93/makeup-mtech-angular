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
<<<<<<< HEAD
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  authState,
  User,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
=======
import { toObservable } from '@angular/core/rxjs-interop';
>>>>>>> main

@Injectable({
  providedIn: 'root',
})
export class AuthService {
<<<<<<< HEAD
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private firestore: Firestore = inject(Firestore);
  public user$: Observable<User | null> = authState(this.auth);
=======
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
>>>>>>> main

  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/dashboard']);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

<<<<<<< HEAD
  async loginWithGoogle(): Promise<any> {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      const user = userCredential.user;
      const userRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        },
        { merge: true }
      );
      this.router.navigate(['/dashboard']);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async signup(displayName: string, email: string, password: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName });
      const userRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName,
      });
=======
  async signup(displayName: string, email: string, password: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
>>>>>>> main
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
