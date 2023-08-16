import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: "./stock.component.html",
  styleUrls: ['./stock.component.css'],
})

export class StockComponent {

  @Input() stock!: any;

}
