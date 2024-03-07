import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

// Model
import { FetchFilterSearchRequest } from '../../models/common/fetch-filter-search-request';
import { FetchFilterSearchResponse } from '../../models/common/fetch-filter-search-response';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private baseUrl = 'https://localhost:7095/api/v1';
  constructor(private http: HttpClient) { }

  fetchFilterSearch(request: FetchFilterSearchRequest): Observable<FetchFilterSearchResponse> {
    const apiUrl = `${this.baseUrl}/common/filter-search`;
    const requestBody = JSON.stringify(request);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    let options = { headers: headers };
    return this.http.post<FetchFilterSearchResponse>(apiUrl, requestBody, options)
      .pipe(
        map(response => {
          return <any>response;
        }),
        retry(1),
        catchError((error: HttpErrorResponse) =>
          throwError("Error - common service: " + error.message)
        )
      );
  }
}
