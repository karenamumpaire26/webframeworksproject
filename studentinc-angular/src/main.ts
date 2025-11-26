import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { BuildingsComponent } from './app/buildings/buildings';

bootstrapApplication(BuildingsComponent, {
  providers: [provideHttpClient()]
}).catch(err => console.error(err));
