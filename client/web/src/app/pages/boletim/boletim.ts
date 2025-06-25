import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-boletim',
  imports: [Header, Sidebar],
  templateUrl: './boletim.html',
  styleUrl: './boletim.css',
})
export class Boletim {}
