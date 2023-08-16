import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserProfileInfo } from '../models/userprofileinfo';
import { HeadersService } from './headers-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  headers: any;
  url = `${environment.api}/user_profile`;

  getUserProfile(): Observable<UserProfileInfo> {
    return this.http.get<UserProfileInfo>(`${this.url}/get_info/`, { "headers": this.headers }).pipe(
      catchError(this.errorHandlingService.handleError<UserProfileInfo>('User profile info error'))
    );
  }

  addFunds(amount: number): Observable<any> {
    const payload = { amount };
    return this.http.post<any>(`${this.url}/add_funds/`, payload, { "headers": this.headers }).pipe(
      catchError(this.errorHandlingService.handleError('Add funds error', []))
    );
  }

  buy_stocks(payload: any): Observable<any> {
    return this.http.post<any>(`${this.url}/buy_stocks/`, payload, { "headers": this.headers }).pipe(
      catchError(this.errorHandlingService.handleError('Buy stocks error', []))
    );
  }

  sell_stocks(payload: any): Observable<any> {
    return this.http.post<any>(`${this.url}/sell_stocks/`, payload, { "headers": this.headers }).pipe(
      catchError(this.errorHandlingService.handleError('Sell stocks error', []))
    );
  }

  get_sell_stock_list(): Observable<any> {
    return this.http.get<any>(`${this.url}/get_sell_stock_list/`, { "headers": this.headers }).pipe(
      catchError(this.errorHandlingService.handleError('Get sell stock list error', []))
    );
  }

  constructor(
    private headersService: HeadersService,
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {
    this.headers = this.headersService.getHeaders();
  }
}
