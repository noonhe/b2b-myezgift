import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/auth/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth/admin',
    loadComponent: () => import('./pages/auth/admin-login/admin-login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'auth/customer',
    loadComponent: () => import('./pages/auth/customer-login/customer-login.component').then(m => m.CustomerLoginComponent)
  },
];

export default routes;
