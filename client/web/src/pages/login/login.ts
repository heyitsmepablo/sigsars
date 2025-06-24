import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ESemusApiClient } from '../../services/e-semus-api';
import { CookieService } from 'ngx-cookie-service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import axios from 'axios';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule, ToastModule],
  providers: [CookieService, ESemusApiClient, MessageService],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username!: string;
  password!: string;
  submitted: boolean = false;
  formBuilder: FormBuilder = new FormBuilder();
  loginForm: FormGroup = this.formBuilder.group({
    username: new FormControl(this.username, [Validators.required]),
    password: new FormControl(this.password, [Validators.required]),
  });
  constructor(
    private readonly apiClientService: ESemusApiClient,
    private readonly cookieService: CookieService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  get usuario() {
    return this.loginForm.get('username');
  }

  get senha() {
    return this.loginForm.get('password');
  }

  wasTouchedAndDirty(control: any) {
    return control.dirty && control.touched;
  }

  async onSubmit() {
    try {
      if (this.loginForm.invalid) {
        this.submitted = true;
        return console.log('invalido');
      }
      const { username, password } = this.loginForm.value;
      const response = await this.apiClientService.login({
        usuario: username,
        senha: password,
      });
      const expiracao = new Date(Date.now() + response.expira_em_milisegundos);
      const usuarioJSON = JSON.stringify(response.usuario);
      this.cookieService.set('token', response.token, expiracao);
      localStorage.setItem('usuario', usuarioJSON);
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.messageService.clear();
      if (error.status == 404) {
        this.messageService.add({
          severity: 'warn',
          summary: `Erro ${error.status}`,
          detail: 'Usuario não encontrado ou incorreto',
        });
      } else if (error.status == 500) {
        this.messageService.add({
          severity: 'error',
          summary: `Erro ${error.code}`,
          detail: 'Erro interno de servidor',
        });
      }
    }
  }
}
