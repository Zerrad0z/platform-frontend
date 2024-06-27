import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { User } from "src/app/models/user.model";
import { Role } from "src/app/models/role.model";

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

  getAllUsers(departmentId?: number): Observable<User[]> {
    let url = `${this.baseUrl}/`;
    let params = new HttpParams();
    
    if (departmentId !== undefined && departmentId !== null) {
      params = params.set('departmentId', departmentId.toString());
    }
  
    return this.http.get<User[]>(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getUserRoles(userId: number, departmentId: number): Observable<Role[]> {
    const headers = new HttpHeaders().set('Department-Id', departmentId.toString());
    console.log(`Making GET request to fetch roles for user ${userId} with headers:`, headers);
    return this.http.get<Role[]>(`${this.baseUrl}/${userId}/roles`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(userId: number, departmentId: number): Observable<User> {
    const headers = new HttpHeaders().set('Department-Id', departmentId.toString());
    console.log(`Making GET request to fetch user ${userId} with headers:`, headers);
    return this.http.get<User>(`${this.baseUrl}/${userId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getCurrentUser(): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    console.log('Making GET request to fetch current user with headers:', headers);
    return this.http.get<User>(this.profileUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user: User, departmentId: number): Observable<User> {
    const headers = new HttpHeaders().set('Department-Id', departmentId.toString());
    console.log(`Making PUT request to update user ${user.id} with headers:`, headers);
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  checkEmailExists(email: string): Observable<boolean> {
    console.log(`Making GET request to check if email ${email} exists`);
    return this.http.get<boolean>(`${this.baseUrl}/check-email`, { params: { email } });
  }

  updateUsername(userId: number, newUsername: string): Observable<any> {
    console.log(`Making PUT request to update username for user ${userId}`);
    return this.http.put(`${this.baseUrl}/${userId}/username`, { newUsername }).pipe(
      catchError(this.handleError)
    );
  }

  changePassword(userId: number, oldPassword: string, newPassword: string): Observable<any> {
    console.log(`Making PUT request to change password for user ${userId}`);
    return this.http.put(`${this.baseUrl}/${userId}/password`, { oldPassword, newPassword }).pipe(
      catchError(this.handleError)
    );
  }

  closeAccount(userId: number, password: string): Observable<any> {
    console.log(`Making POST request to close account for user ${userId}`);
    return this.http.post(`${this.baseUrl}/${userId}/close`, { password }).pipe(
      catchError(this.handleError)
    );
  }

  getCurrentUserDepartmentId(): Observable<number | null> {
    console.log('Making GET request to fetch current user department ID');
    return this.http.get<number | null>(`${this.baseUrl}/current-user/department`).pipe(
      catchError(this.handleError)
    );
  }

  getManageableUsers(): Observable<User[]> {
    console.log('Fetching manageable users');
    return this.http.get<User[]>(`${this.baseUrl}/manageable`).pipe(
      tap(users => console.log('Manageable users fetched:', users)),
      catchError(this.handleError)
    );
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }
}
