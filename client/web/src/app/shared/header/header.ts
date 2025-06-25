import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  usuarioNomeESobrenome = input<string | undefined>('nome e sobrenome');
}
