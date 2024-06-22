// src/app/services/demandeAuthorisation/demande-authorisation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DemandeAuthorisation } from 'src/app/models/demandeAuthorisation.model';

@Injectable({
  providedIn: 'root'
})
export class DemandeAuthorisationService {

  private baseUrl = 'http://localhost:8092/demande-authorisations';

  constructor(private http: HttpClient) { }

  createDemandeAuthorisation(demande: DemandeAuthorisation): Observable<DemandeAuthorisation> {
    return this.http.post<DemandeAuthorisation>(`${this.baseUrl}/create`, demande);
  }
  getAllDemandeAuthorisations(): Observable<DemandeAuthorisation[]> {
    return this.http.get<DemandeAuthorisation[]>(`${this.baseUrl}`);
  }

  getDemandesByUserId(userId: number): Observable<DemandeAuthorisation[]> {
    return this.http.get<DemandeAuthorisation[]>(`${this.baseUrl}/user/${userId}`);
  }

  approveDemande(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/approve`, {});
  }

  rejectDemande(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/reject`, {});
  }
}