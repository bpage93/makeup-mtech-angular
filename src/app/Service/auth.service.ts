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
  updateProfile,
  sendEmailVerification,
} from '@angular/fire/auth';
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

  async updateProfile(displayName: string) {
    const user = this.auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, { displayName });
        // After updating, refresh the signal with the latest user data
        if (this.auth.currentUser) {
          this.currentUser.set(this.auth.currentUser);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
    }
  }

  async uploadProfileImage(file: File, user: User): Promise<string> {
    const filePath = `profile-images/${user.uid}/${file.name}`;
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  }

  async updatePhotoURL(photoURL: string) {
    const user = this.auth.currentUser;
    if (user) {
      await updateProfile(user, { photoURL });
      if (this.auth.currentUser) {
        this.currentUser.set(this.auth.currentUser);
      }
    }
  }

  async sendEmailVerification() {
    const user = this.auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
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
