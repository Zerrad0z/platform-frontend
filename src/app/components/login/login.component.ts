import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  handleLogin(): void {
    let email = this.formLogin.value.email;
    let password = this.formLogin.value.password;
    
    this.authService.login(email, password).subscribe({
      next: data => {
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/admin");
      },
      error: err => {
        console.error(err);
      }
    });
  }
}
