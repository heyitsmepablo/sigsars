import { Component, OnInit, signal } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { Header } from '../../shared/header/header';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ESemusApiClient } from '../../services/e-semus-api';
import { paths } from '../../types/api-types';

@Component({
  selector: 'app-ficha-de-spa-detalhes',
  imports: [BreadcrumbModule, InputTextModule, Header, RouterLink],
  templateUrl: './ficha-de-spa-detalhes.html',
  styleUrl: './ficha-de-spa-detalhes.css',
})
export class FichaDeSpaDetalhes implements OnInit {
  constructor(
    private readonly apiClient: ESemusApiClient,
    private readonly activatedRoute: ActivatedRoute
  ) {}
  items: MenuItem[] = [
    { label: 'Inicio', routerLink: '/inicio' },
    { label: 'Fichas SPA', routerLink: '/ficha-spa' },
    { label: 'Detalhes da Ficha' },
  ];
  fichaId = signal<string>('');
  ficha!: paths['/ficha-spa/{id}']['get']['responses']['200']['content']['application/json'];
  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe((params) => {
      this.fichaId.set(params['id']);
    });

    await this.apiClient.getOneFichaSpa(this.fichaId());
  }
}
