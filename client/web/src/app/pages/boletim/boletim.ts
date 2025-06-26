import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-boletim',
  imports: [Header, Sidebar, RouterOutlet],
  templateUrl: './boletim.html',
  styleUrl: './boletim.css',
})
export class Boletim {}
