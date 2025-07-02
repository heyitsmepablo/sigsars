import { Component, input, Input, ViewChild } from '@angular/core';

import { Sidebar } from '../sidebar/sidebar';
import { ButtonMobileMenu } from '../button-mobile-menu/button-mobile-menu';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-header',
  imports: [ButtonMobileMenu],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private readonly cookie: CookieService) {}
  headerTitle = input<string>();
  usuarioNomeSobrenome() {
    const usuarioStorage = localStorage.getItem('usuario');

    if (!usuarioStorage) {
      throw Error('Usuario não logado');
    }

    const usuario = JSON.parse(usuarioStorage);
    if (!usuario.nome) {
      return 'Usuario Nome';
    }
    const usuarioNomes = usuario.nome.split(' ');

    return `${usuarioNomes[0]} ${usuarioNomes[usuarioNomes.length - 1]}`;
  }
}
