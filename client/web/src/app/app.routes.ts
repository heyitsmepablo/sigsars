import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { BoletimSindomeGripal } from './pages/boletim-sindome-gripal/boletim-sindome-gripal';
import { BoletimSindromeGripalDetalhes } from './pages/boletim-sindrome-gripal-detalhes/boletim-sindrome-gripal-detalhes';

export const routes: Routes = [
  { component: Login, pathMatch: 'full', path: '' },
  { component: Home, path: 'inicio' },
  {
    path: 'boletim',
    children: [
      {
        path: 'sindrome-gripal',
        component: BoletimSindomeGripal,
      },
      {
        path: 'sindrome-gripal/:id',
        component: BoletimSindromeGripalDetalhes,
      },
    ],
  },
];
