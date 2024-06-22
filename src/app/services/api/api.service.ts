import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from 'src/app/models/api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8092/api'; 

  constructor(private http: HttpClient) { }

  getAllAPIs(): Observable<Api[]> {
    return this.http.get<Api[]>(`${this.baseUrl}/list`);
  }

  searchApis(keyword: string): Observable<Api[]> {
    return this.http.get<Api[]>(`${this.baseUrl}/search?keyword=${keyword}`);
  }
}
