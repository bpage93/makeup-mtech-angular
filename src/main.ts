import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app';
import { routes } from './app/app.routes';
// Firebase imports removed

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // Firebase providers removed
    // ...other providers
  ],
});
