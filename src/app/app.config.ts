import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';  // Import from '@angular/common/http'

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { SweetalertService } from './shared/Services/sweetalert.service';
//import { AuthInterceptor } from './shared/interceptor/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideRouter(routes),
      provideHttpClient(withInterceptors([AuthInterceptor])), // Use provideHttpClient from the correct module
      provideAnimations(), // required animations providers
      provideToastr({
          timeOut: 3000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
      }),
      
  ]
};
