import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData = {
    username: '',
    password: ''
  };
  authService: AuthService = inject(AuthService);
  toastrService: ToastrService = inject(ToastrService);

  constructor(
    private router: Router
  ) {}

  login(): void {
    this.authService.login(this.formData.username, this.formData.password)
      .subscribe({
        next: (payload) => {
          if (payload.token) {
            localStorage.setItem('token', `Token ${payload.token}`);
            this.toastrService.success('Login successful');
            this.router.navigate(['/']);
          }
        }
      });
  }
}
