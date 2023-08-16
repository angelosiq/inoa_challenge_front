import { Component, OnInit, inject } from '@angular/core';
import { BrandApiService } from '../services/brand-api.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StocksService } from '../services/stocks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buy-stocks',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './buy-stocks.component.html',
  styleUrls: ['./buy-stocks.component.css']
})
export class BuyStocksComponent implements OnInit {
  brandApiService: BrandApiService = inject(BrandApiService);
  stocksService: StocksService = inject(StocksService);
  toastrService: ToastrService = inject(ToastrService);
  stock: any;
  formData: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getStock();
    this.initForm();
  }

  initForm(): void {
    this.formData = this.formBuilder.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      is_active: false,
      sell_price: [null, [Validators.min(this.stock?.regularMarketPrice)]],
      buy_price: [null, [Validators.min(0)]],
      checking_time_interval: [10, ""]
    });
  }

  getStock(): void {
    const symbol = this.route.snapshot.paramMap.get('symbol');
    if (symbol) {
      this.brandApiService.getStock(symbol)
        .subscribe({
          next: (payload) => {
            this.stock = payload.results.length > 0 ? payload.results[0] : null;
          }
        });
    } else {
      this.location.back();
    }
  }

  submit() {
    if (this.formData.valid) {
      this.stocksService.buy_stocks({...this.formData.value, ...{stock_symbol: this.stock.symbol}})
        .subscribe({
          next: (payload) => {
            console.log(payload);
            this.toastrService.success('Ações compradas com sucesso!', 'Success');
            this.router.navigate(['/']);
          }
        })
    } else {
      this.toastrService.error('Preencha os campos obrigatórios.', 'Error');
    }
  }

}
