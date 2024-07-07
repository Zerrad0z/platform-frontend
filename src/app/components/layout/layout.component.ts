import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isAdmin: boolean = false;
  notificationCount: number = 0;
  showDashboard: boolean = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.hasRole('ADMIN');
    this.showDashboard = this.shouldShowDashboard();
    this.notificationService.getNotificationCount();
    this.notificationService.notificationCount$.subscribe((count: number) => {
      this.notificationCount = count;
    });
  }

  shouldShowDashboard(): boolean {
    return this.authService.hasRole('ADMIN') || 
           this.authService.hasRole('SUPERADMIN') || 
           this.authService.hasRole('USER_A');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  markAsRead(): void {
    this.notificationService.resetNotificationCount().subscribe(() => {
      this.notificationCount = 0;
    });
  }
}