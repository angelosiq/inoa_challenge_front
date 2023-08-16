import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StockList } from '../models/stocklist';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HeadersService } from './headers-service.service';
import { ErrorHandlingService } from './error-handling.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandApiService {

  headers: any;
  url = `${environment.api}/brapi_api/quote/`;

  getStocks(stocks: string): Observable<StockList> {
    return this.http.get<StockList>(`${this.url}${stocks}?interval=1m&range=1d`, { "headers": this.headers }).pipe(
      catchError(this.errorHandlingService.handleError<StockList>('get main stocks error'))
    );
  }

  getStock(stockSymbol: string): Observable<StockList> {
    return this.http.get<StockList>(`${this.url}${stockSymbol}?interval=1m&range=1d`, { "headers": this.headers }).pipe(
      catchError(this.errorHandlingService.handleError<StockList>('get stock error'))
    );
  }

  constructor(
    private http: HttpClient,
    private headersService: HeadersService,
    private errorHandlingService: ErrorHandlingService
  ) {
    this.headers = this.headersService.getHeaders();
  }
}
