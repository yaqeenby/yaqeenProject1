import { Component, Input } from '@angular/core';
import { Line } from '../../types/line.type';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.css']
})
export class CurrencyCardComponent {
  @Input() number: number;
  @Input() currency: string;
  @Input() per: string;
  @Input() chart: Line;
  @Input() chartDirection: 'up' | 'low';
  @Input() selected: boolean = false;

}
