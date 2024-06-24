import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:8092/notifications';
  private notificationCountSubject = new BehaviorSubject<number>(0);
  notificationCount$ = this.notificationCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  getNotificationCount(): void {
    this.http.get<number>(`${this.baseUrl}/count`).subscribe(count => {
      this.notificationCountSubject.next(count);
    });
  }

  resetNotificationCount(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/reset`, {});
  }
}
