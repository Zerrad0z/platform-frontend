import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8092/auth/login';

  isAuthenticated: boolean = false;
  roles: string[] = [];
  username: string | undefined;
  accessToken!: string;

  constructor(private http: HttpClient) {}

  public login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }
    let params = new HttpParams().set("username", username).set("password", password);
    return this.http.post(this.loginUrl, params, options);
  }

  loadProfile(data: any): void {
    console.log('Response from login:', data);

    this.isAuthenticated = true;
    this.accessToken = data['access-token'];

    if (typeof this.accessToken === 'string') {
      try {
        const decodedJwt: any = jwtDecode(this.accessToken);
        this.username = decodedJwt.sub;
        this.roles = decodedJwt.scope.split(' '); // Assuming roles are space-separated in the token
        localStorage.setItem('token', this.accessToken);
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

  getRoles(): string[] {
    return this.roles;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.roles = [];
    this.username = undefined;
    this.accessToken = '';
    localStorage.removeItem('token');
  }
}
