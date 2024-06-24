import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean = false;
  notificationCount: number = 0;

  constructor(
    private router: Router,
    public authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.hasRole('ADMIN');
    this.notificationService.getNotificationCount();
    this.notificationService.notificationCount$.subscribe((count: number) => {
      this.notificationCount = count;
    });
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
