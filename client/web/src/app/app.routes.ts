import { Routes } from '@angular/router';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';

export const routes: Routes = [
  { component: Login, pathMatch: 'full', path: '' },
  {component: Home, path:'home'}
];
