import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  boletinsIsOpened: boolean = false;
  openBoletins() {
    this.boletinsIsOpened = !this.boletinsIsOpened;
  }
}
