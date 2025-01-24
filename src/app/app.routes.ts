import { Routes } from '@angular/router';
import { applicationModulesGuard } from './global/guards/aplication-modules.guard';
import { loginRegisterGuard } from './global/guards/login-register.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivateChild: [loginRegisterGuard],
  },
  { 
    path: 'app',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canActivateChild: [applicationModulesGuard],
  },
];
