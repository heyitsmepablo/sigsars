import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MobileCardItem } from '../../shared/mobile-card-item/mobile-card-item';

@Component({
  selector: 'app-ficha-de-spa',
  imports: [Header, BreadcrumbModule, RouterLink, MobileCardItem],
  templateUrl: './ficha-de-spa.html',
  styleUrl: './ficha-de-spa.css',
})
export class FichaDeSpa {
  items: MenuItem[] = [
    { label: 'Inicio', routerLink: '/inicio' },
    { label: 'Ficha Spa' },
  ];
}
