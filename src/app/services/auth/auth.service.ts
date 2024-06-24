import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
  'access-token': string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8092/auth/login';

  isAuthenticated: boolean = false;
  roles: string[] = [];
  permissions: string[] = [];
  username: string | undefined;
  departmentId: string | undefined;
  accessToken!: string;

  constructor(private http: HttpClient, private router: Router) {}

  public login(email: string, password: string): Observable<LoginResponse> {
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    };
    let params = new HttpParams().set("email", email).set("password", password);
    return this.http.post<LoginResponse>(this.loginUrl, params, options).pipe(
      map(response => {
        if (response && response['access-token']) {
          return response;
        } else {
          throw new Error('Invalid login response');
        }
      }),
      catchError((error: any) => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }

  loadProfile(data: LoginResponse): void {

    this.isAuthenticated = true;
    this.accessToken = data['access-token'];

    if (typeof this.accessToken === 'string') {
      try {
        const decodedJwt: any = jwtDecode(this.accessToken);
        console.log('Decoded JWT:', decodedJwt);
        if (decodedJwt && decodedJwt.sub) {
          this.username = decodedJwt.sub;
          this.roles = decodedJwt.scope ? decodedJwt.scope.split(' ') : [];
          this.permissions = decodedJwt.permissions ? decodedJwt.permissions.split(' ') : [];
          this.departmentId = decodedJwt.department_id; 

          localStorage.setItem('token', this.accessToken);


          if (this.hasRole('ADMIN') || this.hasRole('SUPERADMIN')) {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.isAuthenticated = false;
        }
      } catch (error) {
        this.isAuthenticated = false;
      }
    } else {
      this.isAuthenticated = false;
    }
  }

  getToken(): string {
    return this.accessToken;
  }

  getDepartmentId(): string | undefined {
    return this.departmentId;
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  hasPermission(permission: string): boolean {
    const hasPerm = this.permissions.includes(permission);
    return hasPerm;
  }

  getRoles(): string[] {
    return this.roles;
  }

  getPermissions(): string[] {
    return this.permissions;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.roles = [];
    this.permissions = [];
    this.username = undefined;
    this.accessToken = '';
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Redirect to login page on logout
  }
}
