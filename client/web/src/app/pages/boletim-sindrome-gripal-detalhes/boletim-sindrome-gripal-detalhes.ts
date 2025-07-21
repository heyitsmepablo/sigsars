import { Component, OnInit, Signal, signal } from '@angular/core';
import { Header } from '../../shared/header/header';
import { ESemusApiClient } from '../../services/e-semus-api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { paths } from '../../types/api-types';
import { DatePickerModule } from 'primeng/datepicker';
import { Sidebar } from '../../shared/sidebar/sidebar';
@Component({
  selector: 'app-boletim-sindrome-gripal-detalhes',
  imports: [
    Header,
    BreadcrumbModule,
    RouterLink,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
    DatePickerModule,
    Sidebar,
  ],
  templateUrl: './boletim-sindrome-gripal-detalhes.html',
  styleUrl: './boletim-sindrome-gripal-detalhes.css',
})
export class BoletimSindromeGripalDetalhes implements OnInit {
  boletimId = signal('');
  boletimData!: paths['/boletim/sindrome-gripal/{id}']['get']['responses']['200']['content']['application/json'];
  boletimForm!: FormGroup;
  initValuesForm: any;
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
          disabled: true,
        },
      ],
      total_atendimentos_sd_com_queixa_gripal: [
        {
          value: this.boletimData.total_atendimentos_sd_com_queixa_gripal,
          disabled: true,
        },
      ],
      total_atendimentos_sd_sem_queixa_gripal: [
        {
          value: this.boletimData.total_atendimentos_sd_sem_queixa_gripal,
          disabled: true,
        },
      ],
      total_atendimentos_sn_com_queixa_gripal: [
        {
          value: this.boletimData.total_atendimentos_sn_com_queixa_gripal,
          disabled: true,
        },
      ],
      total_atendimentos_sn_sem_queixa_gripal: [
        {
          value: this.boletimData.total_atendimentos_sn_sem_queixa_gripal,
          disabled: true,
        },
      ],
      total_internacoes_apos_atendimento_urgencia_com_queixa_gripal: [
        {
          value:
            this.boletimData
              .total_internacoes_apos_atendimento_urgencia_com_queixa_gripal,
          disabled: true,
        },
      ],
      total_internacoes_apos_atendimento_urgencia_sem_queixa_gripal: [
        {
          value:
            this.boletimData
              .total_internacoes_apos_atendimento_urgencia_sem_queixa_gripal,
          disabled: true,
        },
      ],
      total_obitos: [{ value: this.boletimData.total_obitos, disabled: true }],
      total_transferencias: [
        { value: this.boletimData.total_transferencias, disabled: true },
      ],
    });
    this.initValuesForm = this.boletimForm.getRawValue();
  }
  openEdit() {
    this.boletimForm.enable();
  }
  closeEdit() {
    this.boletimForm.reset(this.initValuesForm);
    this.boletimForm.disable();
  }
}
