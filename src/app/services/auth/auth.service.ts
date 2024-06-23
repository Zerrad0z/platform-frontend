import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

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
    console.log('Response from login:', data);

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
          
          localStorage.setItem('token', this.accessToken);
          console.log('User roles:', this.roles);
          console.log('User permissions:', this.permissions);
          
          // Navigate to the appropriate page based on role
          if (this.hasRole('ADMIN')) {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          console.error('Invalid token format: Missing required claims');
          this.isAuthenticated = false;
        }
      } catch (error) {
        console.error('Invalid token format', error);
        this.isAuthenticated = false;
      }
    } else {
      console.error('Invalid token format: Access token is not a string');
      this.isAuthenticated = false;
    }
  }

  getToken(): string {
    return this.accessToken;
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  hasPermission(permission: string): boolean {
    const hasPerm = this.permissions.includes(permission);
    console.log(`Checking permission: ${permission} - ${hasPerm}`);
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
