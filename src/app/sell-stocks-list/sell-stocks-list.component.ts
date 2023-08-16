import { Component } from '@angular/core';
import { StocksService } from '../services/stocks.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StockComponent } from '../stock/stock.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sell-stocks-list',
  standalone: true,
  imports: [
    StockComponent,
    CommonModule
  ],
  templateUrl: './sell-stocks-list.component.html',
  styleUrls: ['./sell-stocks-list.component.css']
})
export class SellStocksListComponent {
  stocksList: any[] = [];
  filteredStocksList: any[] = [];
  stocksService: StocksService = inject(StocksService);
  toastrService: ToastrService = inject(ToastrService);

  constructor(private router: Router) {
    this.getStocks();
  }

  getStocks() {
    return this.stocksService.get_sell_stock_list()
    .subscribe({
      next: (payload) => {
        this.stocksList = payload.stocks;
        this.filteredStocksList = payload.stocks;
      }
    });
  }

  filterResults(text: string) {
    if (!text) {

    }
  }

  back(): void {
    this.router.navigate(['/']);
  }
}
