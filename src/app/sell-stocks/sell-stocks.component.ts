import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { BrandApiService } from '../services/brand-api.service';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { StocksService } from '../services/stocks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sell-stocks',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './sell-stocks.component.html',
  styleUrls: ['./sell-stocks.component.css']
})
export class SellStocksComponent {
  brandApiService: BrandApiService = inject(BrandApiService);
  stocksService: StocksService = inject(StocksService);
  toastrService: ToastrService = inject(ToastrService)
  stock: any;
  formData: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getStock();
    this.initForm();
  }

  initForm(): void {
    this.formData = this.formBuilder.group({
      amount: [null, [Validators.required, Validators.min(1)]],
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

  submit(): void {
    if (this.formData.valid) {
      this.stocksService.sell_stocks({...this.formData.value, ...{stock_symbol: this.stock.symbol}})
        .subscribe({
          next: (payload) => {
            this.toastrService.success('Ações vendidas com sucesso!');
            this.router.navigate(['/']);
          }
        })
    } else {
      this.toastrService.error('Preencha os campos obrigatórios.');
    }
  }
}
