import { Component, input, Input, ViewChild } from '@angular/core';

import { Sidebar } from '../sidebar/sidebar';
import { ButtonMobileMenu } from '../button-mobile-menu/button-mobile-menu';
@Component({
  selector: 'app-header',
  imports: [ButtonMobileMenu],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  usuarioNomeESobrenome = input<string | undefined>('nome e sobrenome');
}
