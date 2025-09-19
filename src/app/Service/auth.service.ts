import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private firestore: Firestore = inject(Firestore);

  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/dashboard']);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async loginWithGoogle(): Promise<any> {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      const user = userCredential.user;
      const userRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userRef, { 
        uid: user.uid, 
        email: user.email, 
        displayName: user.displayName 
      });
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
      const userRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userRef, { 
        uid: user.uid, 
        email: user.email, 
        displayName 
      });
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
}
