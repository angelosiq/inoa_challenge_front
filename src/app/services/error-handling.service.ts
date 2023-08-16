import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  toastrService: ToastrService = inject(ToastrService);

  constructor() { }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      error = error && error.error && error.error.error ? error.error.error : error.error.detail;
      console.log(error);
      this.toastrService.error(error);
      return of(result as T);
    };
  }
}
