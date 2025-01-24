import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivateChild: [],
  },
  { 
    path: 'app',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canActivateChild: [],
  },
];
