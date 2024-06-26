import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service'; 

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(private router: Router, public authService: AuthService) { }

  logout(): void {
    console.log('User logged out');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
