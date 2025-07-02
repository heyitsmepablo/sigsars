import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-mobile-card-item',
  imports: [CommonModule],
  templateUrl: './mobile-card-item.html',
  styleUrl: './mobile-card-item.css',
})
export class MobileCardItem {
  item = input<Record<string, any> | undefined>();
  styleCard = input<string>();
}
