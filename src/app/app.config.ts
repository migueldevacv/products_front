import { tokenManagerInterceptor } from './global/interceptors/token-manager.interceptor';
import { errorManagerInterceptor } from './global/interceptors/error-manager.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { MessageService } from 'primeng/api';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([errorManagerInterceptor, tokenManagerInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    MessageService
  ],
};
