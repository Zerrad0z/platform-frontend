import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private baseUrl = 'http://localhost:8092/permissions'; 

  constructor(private http: HttpClient) { }

  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.baseUrl);
  }
}