import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Permission } from "src/app/models/permission.model";
import { Role } from "src/app/models/role.model";
import { User } from "src/app/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8092/users'; 
  private profileUrl = 'http://localhost:8092/profile';

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

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }
  
  getCurrentUser(): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<User>(this.profileUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user).pipe(
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
}
