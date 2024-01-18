import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/main/app.config';
import { AppComponent } from './app/main/app.component';

// Supports weights 100-900
import '@fontsource-variable/saira';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
