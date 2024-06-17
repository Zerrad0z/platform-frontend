// src/app/services/authorisation/authorisation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authorisation } from 'src/app/models/authorisation.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {

  private apiUrl = 'http://localhost:8092/authorizations'; 
  constructor(private http: HttpClient) { }

  getAllAuthorisations(): Observable<Authorisation[]> {
    return this.http.get<Authorisation[]>(`${this.apiUrl}/`);
  }
}
