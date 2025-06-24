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
@Component({
  selector: 'app-login',
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule, ToastModule],
  providers: [CookieService, ESemusApiClient,MessageService],
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
    private readonly messageService: MessageService
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

  showError(data:{code:string|number|null,message:string}){
    this.messageService.clear();
    this.messageService.add({severity:'error', summary: data.code ? `Erro ${data.code}`: undefined , detail:data.message});
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
      this.cookieService.set('token', response.token, expiracao);
      localStorage.setItem('usuario', JSON.stringify(response.usuario));
      console.log('funcionou');
    } catch (error: any) {
      console.log(error)
    }
  }
}
