import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from '../stock/stock.component';
import { BalanceComponent } from '../balance/balance.component';
import { StocksPieChartComponent } from '../stocks-pie-chart/stocks-pie-chart.component';
import { StocksService } from '../services/stocks.service';
import { UserProfileInfo } from '../models/userprofileinfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    StockComponent,
    BalanceComponent,
    StocksPieChartComponent
  ],
  templateUrl: "./home.component.html",
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  stocksService: StocksService = inject(StocksService);
  userProfile: UserProfileInfo | null = null;


  constructor(
    private router: Router,
  ) {
    this.stocksService.getUserProfile()
      .subscribe({
        next: (payload) => {
          this.userProfile = payload;
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
