import { Component, OnInit, signal, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MobileCardItem } from '../../shared/mobile-card-item/mobile-card-item';
import { ESemusApiClient } from '../../services/e-semus-api';
import { DatePipe } from '@angular/common';
import { Header } from '../../shared/header/header';
import { Sidebar } from '../../shared/sidebar/sidebar';
@Component({
  selector: 'app-boletim-sindome-gripal',
  imports: [
    BreadcrumbModule,
    RouterLink,
    MobileCardItem,
    DatePipe,
    Header,
    Sidebar,
  ],
  templateUrl: './boletim-sindome-gripal.html',
  styleUrl: './boletim-sindome-gripal.css',
})
export class BoletimSindomeGripal implements OnInit {
  items!: {}[];
  boletins!: Record<string, any>[];
  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiClient: ESemusApiClient
  ) {}
  async ngOnInit() {
    this.boletins = await this.apiClient.getAllBoletins();

    this.items = [
      { label: 'Inicio', route: '/inicio' },
      { label: 'Boletim Sindrome Gripal', route: '/boletim/sindrome-gripal' },
    ];
  }
}
