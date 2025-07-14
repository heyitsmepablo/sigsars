import { Component, OnInit, signal } from '@angular/core';
import { Header } from '../../shared/header/header';
import { ESemusApiClient } from '../../services/e-semus-api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DatePipe, formatDate } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { paths } from '../../types/api-types';
import { DatePickerModule } from 'primeng/datepicker';
@Component({
  selector: 'app-boletim-sindrome-gripal-detalhes',
  imports: [
    Header,
    BreadcrumbModule,
    RouterLink,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    DatePipe,
    DatePickerModule,
  ],
  templateUrl: './boletim-sindrome-gripal-detalhes.html',
  styleUrl: './boletim-sindrome-gripal-detalhes.css',
})
export class BoletimSindromeGripalDetalhes implements OnInit {
  boletimId = signal('');
  boletimData!: paths['/boletim/sindrome-gripal/{id}']['get']['responses']['200']['content']['application/json'];
  boletimForm!: FormGroup;
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
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.boletimId.set(params['id']);
    });
  }

  async ngOnInit(): Promise<void> {
    this.boletimData = await this.apiClient.getBoletimDetails(this.boletimId());
    this.boletimForm = this.formBuilder.group({
      referente_ao_dia: [
        {
          value: new Date(this.boletimData.referente_ao_dia),
          disabled: false,
        },
      ],
      unidade: [{ value: this.boletimData.unidade.nome, disabled: true }],
      usuario: [{ value: this.boletimData.usuario.nome, disabled: true }],
      enviado_em: [
        {
          value: formatDate(this.boletimData.criado_em ?? '', 'dateTime', 'pt'),
          disabled: true,
        },
      ],
      total_atendimentos_sd_com_queixa_gripal: [
        this.boletimData.total_atendimentos_sd_com_queixa_gripal,
      ],
      total_atendimentos_sd_sem_queixa_gripal: [
        this.boletimData.total_atendimentos_sd_sem_queixa_gripal,
      ],
      total_atendimentos_sn_com_queixa_gripal: [
        this.boletimData.total_atendimentos_sn_com_queixa_gripal,
      ],
      total_atendimentos_sn_sem_queixa_gripal: [
        this.boletimData.total_atendimentos_sn_sem_queixa_gripal,
      ],
      total_internacoes_apos_atendimento_urgencia_com_queixa_gripal: [
        this.boletimData
          .total_internacoes_apos_atendimento_urgencia_com_queixa_gripal,
      ],
      total_internacoes_apos_atendimento_urgencia_sem_queixa_gripal: [
        this.boletimData
          .total_internacoes_apos_atendimento_urgencia_sem_queixa_gripal,
      ],
      total_obitos: [this.boletimData.total_obitos],
      total_transferencias: [this.boletimData.total_transferencias],
    });
  }
}
