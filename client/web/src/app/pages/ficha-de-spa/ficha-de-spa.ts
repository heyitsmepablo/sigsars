import { Component, OnInit } from '@angular/core';
import { Header } from '../../shared/header/header';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MobileCardItem } from '../../shared/mobile-card-item/mobile-card-item';
import { ESemusApiClient } from '../../services/e-semus-api';
import { paths } from '../../types/api-types';
import { AxiosResponse } from 'axios';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ficha-de-spa',
  imports: [Header, BreadcrumbModule, RouterLink, MobileCardItem, DatePipe],
  templateUrl: './ficha-de-spa.html',
  styleUrl: './ficha-de-spa.css',
})
export class FichaDeSpa implements OnInit {
  constructor(private readonly apiCliente: ESemusApiClient) {}
  fichas!: paths['/ficha-spa']['get']['responses']['200']['content']['application/json'];
  items: MenuItem[] = [
    { label: 'Inicio', routerLink: '/inicio' },
    { label: 'Ficha Spa' },
  ];

  async ngOnInit() {
    this.fichas = (await this.apiCliente.getAllFichaSpa()).data;
  }
}
