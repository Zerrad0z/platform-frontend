import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8092/users'; 

  constructor(private http: HttpClient) { }

  addUser(user: {
    username: string,
    email: string,
    password: string,
    apiKey: string,
    roles: Set<string>,
    permissions: Set<string>
  }): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/add`, user).pipe(
      catchError(this.handleError)
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/`).pipe(
      catchError(this.handleError)
    );
  }

  getUserRoles(userId: number): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/${userId}/roles`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profile`);
  }
}