import { Component } from '@angular/core';
import { BrandApiService } from '../services/brand-api.service';
import { inject } from '@angular/core';
import { StockComponent } from '../stock/stock.component';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [StockComponent, CommonModule],
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent {
  stocksList: any[] = [];
  brandApiService: BrandApiService = inject(BrandApiService);
  toastrService: ToastrService = inject(ToastrService);
  filteredStocksList: any[] = [];
  stocks: string = 'PETR4,TAEE11,BBSE3,AZUL4,BBDC4,CIEL3,ITUB3,ITUB4,VALE3';

  constructor(private router: Router) {
    this.getStocks(this.stocks);
  }

  getStocks(stocks: string) {
    return this.brandApiService.getStocks(stocks)
    .subscribe({
      next: (payload) => {
        if (!!payload) {
          this.stocksList = payload.results.filter((stock: any) => !stock.error);
          this.filteredStocksList = payload.results;
        }
      }
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.getStocks(this.stocks);
    }

    this.getStocks(text);
  }

  back(): void {
    this.router.navigate(['/']);
  }

}
