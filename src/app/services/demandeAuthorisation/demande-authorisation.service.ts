import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DemandeAuthorisation } from 'src/app/models/demandeAuthorisation.model';

@Injectable({
  providedIn: 'root'
})
export class DemandeAuthorisationService {

  private apiUrl = 'http://localhost:8092/demande-authorisations'; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  getAllDemandeAuthorisations(): Observable<DemandeAuthorisation[]> {
    return this.http.get<DemandeAuthorisation[]>(`${this.apiUrl}`);
  }
}
