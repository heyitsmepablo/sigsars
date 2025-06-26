import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Boletim } from './pages/boletim/boletim';
import { BoletimSindomeGripal } from './pages/boletim/boletim-sindome-gripal/boletim-sindome-gripal';

export const routes: Routes = [
  { component: Login, pathMatch: 'full', path: '' },
  { component: Home, path: 'inicio' },
  {
    component: Boletim,
    path: 'boletim',
    children: [{ path: 'sindrome-gripal', component: BoletimSindomeGripal }],
  },
];
