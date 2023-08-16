import { Component } from '@angular/core';
import { StocksService } from '../services/stocks.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-funds',
  templateUrl: './add-funds.component.html',
  styleUrls: ['./add-funds.component.css']
})
export class AddFundsComponent {
  formData = {
    amount: 0
  };
  stockService: StocksService = inject(StocksService);
  toastrService: ToastrService = inject(ToastrService);

  constructor(
    private router: Router
  ) { }

  login(): void {
    this.stockService.addFunds(this.formData.amount)
      .subscribe({
        next: () => {
          this.toastrService.success('Fundos adicionados com sucesso.');
          this.router.navigate(['/']);
        }
      });
    }

  back(): void {
    this.router.navigate(['/']);
  }
}
