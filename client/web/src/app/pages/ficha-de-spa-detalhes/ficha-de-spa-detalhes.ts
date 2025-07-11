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

  has!: boolean;
  drc!: boolean;
  dm!: boolean;
  outros!: string | undefined | null;
  hasOutros!: boolean;
  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe((params) => {
      this.fichaId.set(params['id']);
    });

    this.ficha = await this.apiClient.getOneFichaSpa(this.fichaId());
    console.log(this.ficha);
    this.has =
      this.ficha.ficha_spa_classificacao[0].ficha_spa_doenca_preexistente?.[0]
        .has ?? false;
    this.drc =
      this.ficha.ficha_spa_classificacao[0].ficha_spa_doenca_preexistente?.[0]
        .drc ?? false;
    this.dm =
      this.ficha.ficha_spa_classificacao[0].ficha_spa_doenca_preexistente?.[0]
        .dm ?? false;
    this.outros =
      this.ficha.ficha_spa_classificacao[0].ficha_spa_doenca_preexistente?.[0].outros;

    this.hasOutros = this.outros ? true : false;
  }

  debug(arg: any) {
    console.log(arg);
  }
}
