import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { User } from 'src/app/models/user.model';

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
  departmentId: number | undefined;
  accessToken!: string;

  constructor(private http: HttpClient, private router: Router) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.accessToken = token;
      this.isAuthenticated = true;
      this.loadProfile({ 'access-token': token });
    }
  }

  public login(email: string, password: string): Observable<LoginResponse> {
    const options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    };
    const params = new HttpParams().set("email", email).set("password", password);
    return this.http.post<LoginResponse>(this.loginUrl, params, options).pipe(
      map(response => {
        if (response && response['access-token']) {
          this.loadProfile(response);
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
          this.departmentId = parseInt(decodedJwt.department_id, 10);
          console.log('Department ID set to:', this.departmentId);
          localStorage.setItem('token', this.accessToken);

          // Redirect based on roles
          this.router.navigate(['/layout']);
        } else {
          this.isAuthenticated = false;
        }
      } catch (error) {
        console.error('Error decoding JWT:', error);
        this.isAuthenticated = false;
      }
    } else {
      this.isAuthenticated = false;
    }
  }

  getToken(): string {
    return this.accessToken;
  }

  getDepartmentId(): number | undefined {
    console.log('Retrieving Department ID:', this.departmentId);
    return this.departmentId;
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
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

  canManageUser(user: User): boolean {
    const currentUserRoles = this.getRoles();
    if (currentUserRoles.includes('SUPERADMIN')) {
      return user.roles.some(role => role.name === 'ADMIN');
    } else if (currentUserRoles.includes('ADMIN')) {
      return user.roles.some(role => role.name === 'USER_B' || role.name === 'USER_A');
    }
    return false;
  }
}
