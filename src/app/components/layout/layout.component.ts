import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(private router: Router) { }

  logout(): void {
    // Implement your logout logic here
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}
