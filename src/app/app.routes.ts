import { Routes } from '@angular/router';
import { HomeComponent } from './pages/auth/home/home.component';
import { AdminLoginComponent } from './pages/auth/admin-login/admin-login.component';
import { CustomerLoginComponent } from './pages/auth/customer-login/customer-login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/admin', component: AdminLoginComponent },
  { path: 'auth/customer', component: CustomerLoginComponent },
];

export default routes;
