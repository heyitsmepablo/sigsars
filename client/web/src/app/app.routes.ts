import { Routes } from '@angular/router';
import { Login } from '../pages/login/login';

export const routes: Routes = [
  { component: Login, pathMatch: 'full', path: '' },
];
