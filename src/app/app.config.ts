// src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
// import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Sets up the application's routes
    provideRouter(routes),

    // Enables the HttpClient for making API calls
    provideHttpClient(),

    // Enables Angular animations
    // provideAnimations(),

    // Firebase providers removed
  ],
};
