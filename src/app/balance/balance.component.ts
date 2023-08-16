import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent {
  @Input() balance!: any;
}
