import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Leave } from './leave/leave';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: Login },
  { path: 'leave', component: Leave },
];
