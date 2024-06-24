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
  
  addUser(user: { email: string, roles: any[], permissions: any[] }, departmentId: number): Observable<User> {
    const headers = { 'Department-Id': departmentId.toString() };
    return this.http.post<User>(`${this.baseUrl}/add`, user, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  completeRegistration(token: string, username: string, password: string): Observable<any> {
    const body = { token, username, password };
    const headers = new HttpHeaders();
    console.log("Sending complete registration request with body:", body);
    return this.http.post<any>(`${this.baseUrl}/complete-registration`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getApiKey(): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<string>(`${this.baseUrl}/api-key`, { headers }).pipe(
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

  getAllUsers(departmentId: number): Observable<User[]> {
    const headers = new HttpHeaders().set('Department-Id', departmentId.toString());
    return this.http.get<User[]>(`${this.baseUrl}/`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getUserRoles(userId: number, departmentId: number): Observable<Role[]> {
    const headers = new HttpHeaders().set('Department-Id', departmentId.toString());
    return this.http.get<Role[]>(`${this.baseUrl}/${userId}/roles`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(userId: number, departmentId: number): Observable<User> {
    const headers = new HttpHeaders().set('Department-Id', departmentId.toString());
    return this.http.get<User>(`${this.baseUrl}/${userId}`, { headers }).pipe(
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

  updateUser(user: User, departmentId: number): Observable<User> {
    const headers = new HttpHeaders().set('Department-Id', departmentId.toString());
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}