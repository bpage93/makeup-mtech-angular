// src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';


// --- FIREBASE IMPORTS ---
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    // Sets up the application's routes
    provideRouter(routes),

    // Enables the HttpClient for making API calls
    provideHttpClient(),

    // Enables Angular animations
    provideAnimationsAsync(),

    // --- FIREBASE PROVIDERS ---
    // Initializes the Firebase app using your environment variables
    

    // Provides the Firebase Authentication service
    provideAuth(() => getAuth()),

    // Provides the Firestore Database service
    provideFirestore(() => getFirestore()),
  ],
};