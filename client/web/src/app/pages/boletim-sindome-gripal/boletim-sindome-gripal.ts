import { Component, OnInit, signal, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MobileCardItem } from '../../shared/mobile-card-item/mobile-card-item';
import { ESemusApiClient } from '../../services/e-semus-api';
import { CommonModule, DatePipe } from '@angular/common';
import { Header } from '../../shared/header/header';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { TableModule } from 'primeng/table';
import { paths } from '../../types/api-types';
import { DialogModule, Dialog } from 'primeng/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  RxReactiveFormsModule,
  RxwebValidators,
} from '@rxweb/reactive-form-validators';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { UsuarioPayload } from '../../types/api-client.type';
@Component({
  selector: 'app-boletim-sindome-gripal',
  imports: [
    BreadcrumbModule,
    RouterLink,
    MobileCardItem,
    DatePipe,
    Header,
    Sidebar,
    TableModule,
    RxReactiveFormsModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    CommonModule,
    Dialog,
    InputTextModule,
    DatePickerModule,
  ],
  templateUrl: './boletim-sindome-gripal.html',
  styleUrl: './boletim-sindome-gripal.css',
})
export class BoletimSindomeGripal implements OnInit {
  items!: {}[];
  boletins!: paths['/boletim/sindrome-gripal']['get']['responses']['200']['content']['application/json'];
  newBoletimForm!: FormGroup;
  novaFichaVisible: boolean = false;
  usuario!: UsuarioPayload;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiClient: ESemusApiClient,
    private readonly formBuilder: FormBuilder
  ) {
    this.items = [
      { label: 'Inicio', route: '/inicio' },
      { label: 'Boletim Sindrome Gripal' },
    ];
    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
      this.usuario = JSON.parse(usuarioData);
    }
  }

  async ngOnInit() {
    this.boletins = await this.apiClient.getAllBoletins();
    this.newBoletimForm = this.formBuilder.group({
      referente_ao_dia: ['', [Validators.required, RxwebValidators.time()]],
      total_atendimentos_sd_com_queixa_gripal: [
        '',
        [Validators.required, RxwebValidators.digit],
      ],
      total_atendimentos_sd_sem_queixa_gripal: [
        '',
        [Validators.required, RxwebValidators.digit],
      ],
      total_atendimentos_sn_com_queixa_gripal: [
        '',
        [Validators.required, RxwebValidators.digit],
      ],
      total_atendimentos_sn_sem_queixa_gripal: [
        '',
        [Validators.required, RxwebValidators.digit],
      ],
      total_internacoes_apos_atendimento_urgencia_com_queixa_gripal: [
        '',
        [Validators.required, RxwebValidators.digit],
      ],
      total_internacoes_apos_atendimento_urgencia_sem_queixa_gripal: [
        '',
        [Validators.required, RxwebValidators.digit],
      ],
      total_obitos: ['', [Validators.required, RxwebValidators.digit]],
      total_transferencias: ['', [Validators.required, RxwebValidators.digit]],
    });
    console.log(this.boletins);
  }

  showNovaFicha() {
    this.novaFichaVisible = true;
  }
  closeNovaFicha() {
    this.novaFichaVisible = false;
    this.newBoletimForm.reset();
  }
}
