import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-mobile-module-card',
  imports: [CommonModule],
  templateUrl: './mobile-module-card.html',
  styleUrl: './mobile-module-card.css',
})
export class MobileModuleCard {
  moduleTitle = input.required<string>();
}
