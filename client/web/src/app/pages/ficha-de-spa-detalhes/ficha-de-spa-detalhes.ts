import { Component, OnInit, signal } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { Header } from '../../shared/header/header';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ESemusApiClient } from '../../services/e-semus-api';
import { paths } from '../../types/api-types';
import { DatePipe } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
type FichaSpaPayload =
  paths['/ficha-spa/{id}']['get']['responses']['200']['content']['application/json'];
@Component({
  selector: 'app-ficha-de-spa-detalhes',
  imports: [
    BreadcrumbModule,
    InputTextModule,
    Header,
    RouterLink,
    DatePipe,
    CheckboxModule,
    FormsModule,
  ],
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
  ficha!: FichaSpaPayload;
  doencasPreexistentes!: { [key: string]: boolean }[] | [];
  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe((params) => {
      this.fichaId.set(params['id']);
    });

    this.ficha = await this.apiClient.getOneFichaSpa(this.fichaId());
    const preexistente =
      this.ficha.ficha_spa_classificacao?.[0]
        ?.ficha_spa_doenca_preexistente?.[0];
    this.doencasPreexistentes = preexistente ? [preexistente] : [];
    console.log(this.ficha);
  }

  debug(arg: any) {
    console.log(arg);
  }
}
