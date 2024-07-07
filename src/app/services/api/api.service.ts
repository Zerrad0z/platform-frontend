import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Api } from 'src/app/models/api.model';
import { UserService } from '../user/user.service';
import { Authorisation } from 'src/app/models/authorisation.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8092/api';
  private authorizationUrl = 'http://localhost:8092/authorizations';

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  getAllUnauthorizedAPIs(): Observable<Api[]> {
    return this.userService.getCurrentUser().pipe(
      switchMap(currentUser => 
        this.http.get<Api[]>(`${this.apiUrl}/list`).pipe(
          switchMap(apis => 
            this.getAuthorisationsByUserId(currentUser.id).pipe(
              map(authorisations => 
                apis.filter(api => {
                  const differentDepartment = api.departmentId !== currentUser.departmentId;
                  const noAccess = !this.userHasAccess(authorisations, api.name);
                  console.log(`API ${api.id} (${api.name}): Different department: ${differentDepartment}, No access: ${noAccess}`);
                  return differentDepartment && noAccess;
                })
              )
            )
          )
        )
      ),
      catchError(this.handleError)
    );
  }

  private getAuthorisationsByUserId(userId: number): Observable<Authorisation[]> {
    return this.http.get<Authorisation[]>(`${this.authorizationUrl}/user/${userId}`).pipe(
      catchError((error) => {
        console.error('Error fetching authorizations:', error);
        return of([]);
      })
    );
  }

  private userHasAccess(authorisations: Authorisation[], apiName: string): boolean {
    const now = new Date();
    console.log(`Checking access for API ${apiName}`);
    
    const hasAccess = authorisations.some(auth => {
      const sameApi = auth.apiName === apiName;
      const isActive = auth.status === true;
      const startDateValid = new Date(auth.startDate) <= now;
      const endDateValid = !auth.endDate || new Date(auth.endDate) > now;
      return sameApi && isActive && startDateValid && endDateValid;
    });

    console.log(`Access result for API ${apiName}: ${hasAccess}`);
    return hasAccess;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }

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
  updateAPI(api: Api): Observable<Api> {
    return this.http.put<Api>(`${this.apiUrl}/${api.id}`, api);
  }
}
