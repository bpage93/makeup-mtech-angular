import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // Ensure the path and name are correct

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));