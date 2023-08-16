import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ErrorHandlingService } from './error-handling.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `${environment.main}/api-token-auth/`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlingService: ErrorHandlingService
  ) {}

  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.http.post<any>(`${this.url}`, payload).pipe(
      catchError(this.errorHandlingService.handleError('Login error', []))
    );
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
