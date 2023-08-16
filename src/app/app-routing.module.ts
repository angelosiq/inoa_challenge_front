import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { canActivate } from './auth/auth.guard';
import { AddFundsComponent } from './add-funds/add-funds.component';
import { StocksComponent } from './stocks/stocks.component';
import { BuyStocksComponent } from './buy-stocks/buy-stocks.component';
import { SellStocksListComponent } from './sell-stocks-list/sell-stocks-list.component';
import { SellStocksComponent } from './sell-stocks/sell-stocks.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
    title: 'Dashboard',
    canActivate: [canActivate],
  },
  {
    path: 'add-funds',
    component: AddFundsComponent,
    title: 'Adicionar fundos',
    canActivate: [canActivate],
  },
  {
    path: 'stocks',
    component: StocksComponent,
    title: 'Ações',
    canActivate: [canActivate],
  },
  {
    path: 'buy-stocks/:symbol',
    component: BuyStocksComponent,
    title: 'Comprar ações',
    canActivate: [canActivate],
  },
  {
    path: 'sell-stocks-list',
    component: SellStocksListComponent,
    title: 'Lista de ações para vender',
    canActivate: [canActivate],
  },
  {
    path: 'sell-stocks/:symbol',
    component: SellStocksComponent,
    title: 'Ação para venda',
    canActivate: [canActivate],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
