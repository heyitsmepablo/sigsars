import { Component, OnInit, signal } from '@angular/core';
import { Header } from '../../shared/header/header';
import { ESemusApiClient } from '../../services/e-semus-api';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DatePipe } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-boletim-sindrome-gripal-detalhes',
  imports: [
    Header,
    BreadcrumbModule,
    RouterLink,
    DatePipe,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './boletim-sindrome-gripal-detalhes.html',
  styleUrl: './boletim-sindrome-gripal-detalhes.css',
})
export class BoletimSindromeGripalDetalhes implements OnInit {
  boletimId = signal('');
  boletimData!: Record<string, any>;

  items: MenuItem[] = [
    { label: 'Inicio', route: '/inicio' },
    {
      label: 'Boletim Sindrome Gripal',
      route: '/boletim/sindrome-gripal',
    },
    { label: 'Detalhes do Boletim' },
  ];

  constructor(
    private readonly apiClient: ESemusApiClient,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.boletimId.set(params['id']);
    });
  }

  async ngOnInit(): Promise<void> {
    this.boletimData = await this.apiClient.getBoletimDetails(this.boletimId());
    console.log(this.boletimData);
  }
}
