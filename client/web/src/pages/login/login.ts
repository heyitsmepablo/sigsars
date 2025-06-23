import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ESemusApiClient } from '../../services/e-semus-api';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule],
  providers: [CookieService, ESemusApiClient],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formBuilder: FormBuilder = new FormBuilder();
  username!: string;
  password!: string;
  loginForm: FormGroup = this.formBuilder.group({
    username: new FormControl(this.username, [Validators.required]),
    password: new FormControl(this.password, [Validators.required]),
  });
  constructor(
    private readonly apiClientService: ESemusApiClient,
    private readonly cookieService: CookieService
  ) {}
  async onSubmit() {
    if (this.loginForm.invalid) {
      console.log('invalido');
    }
    try {
      const { username, password } = this.loginForm.value;
      const response = await this.apiClientService.login({
        usuario: username,
        senha: password,
      });
      const expiracao = new Date(Date.now() + response.expira_em_milisegundos);
      this.cookieService.set('token', response.token, expiracao);
      localStorage.setItem('usuario', JSON.stringify(response.usuario));
      console.log('funcionou');
    } catch (error) {
      console.error(error);
    }
  }
}
