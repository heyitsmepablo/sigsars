import { Component, OnInit } from '@angular/core';
import { Header } from '../../shared/header/header';
import { UsuarioPayload } from '../../types/api-client.type';
import { CardModule } from 'primeng/card';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { MobileModuleCard } from '../../shared/mobile-module-card/mobile-module-card';

@Component({
  selector: 'app-home',
  imports: [Header, CardModule, Sidebar, MobileModuleCard],
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
