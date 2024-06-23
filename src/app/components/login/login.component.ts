import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  handleLogin() {
    const email = this.formLogin.get('email')?.value;
    const password = this.formLogin.get('password')?.value;

    this.authService.login(email, password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.authService.loadProfile(response);
      },
      (error: HttpErrorResponse) => {
        console.error('Login error:', error);
        if (error.status === 401) {
          alert('Unauthorized: Invalid email or password.');
        } else {
          alert('An error occurred during login. Please try again.');
        }
      }
    );
  }
}
