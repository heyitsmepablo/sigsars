import { Component, ViewChild } from '@angular/core';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-button-mobile-menu',
  imports: [DrawerModule, ButtonModule, AvatarModule, RouterLink, CommonModule],
  templateUrl: './button-mobile-menu.html',
  styleUrl: './button-mobile-menu.css',
})
export class ButtonMobileMenu {
  boletinsIsOpened: boolean = false;

  openBoletins() {
    this.boletinsIsOpened = !this.boletinsIsOpened;
  }
  
  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  visible: boolean = false;
}
