import { Component, OnInit } from '@angular/core';
import { Header } from '../../shared/header/header';
import { UsuarioPayload } from '../../types/api-client.type';
import { CardModule } from 'primeng/card';
import { Sidebar } from '../../shared/sidebar/sidebar';
@Component({
  selector: 'app-home',
  imports: [Header, CardModule, Sidebar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  usuario!: UsuarioPayload;
  constructor() {
    const userLocalStorage = localStorage.getItem('usuario');
    console.log(userLocalStorage);
    if (userLocalStorage) {
      this.usuario = JSON.parse(userLocalStorage);
    }
  }
}
