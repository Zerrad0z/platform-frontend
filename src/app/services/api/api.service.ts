import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from 'src/app/models/api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8092/api';

  constructor(private http: HttpClient) {}

  saveAPI(api: Api): Observable<Api> {
    return this.http.post<Api>(`${this.apiUrl}/save`, api);
  }

  getAllAPIs(): Observable<Api[]> {
    return this.http.get<Api[]>(`${this.apiUrl}/list`);
  }

  getAPIById(id: number): Observable<Api> {
    return this.http.get<Api>(`${this.apiUrl}/${id}`);
  }

  deleteAPI(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchApi(keyword: string): Observable<Api[]> {
    return this.http.get<Api[]>(`${this.apiUrl}/search`, {
      params: { keyword }
    });
  }
}
