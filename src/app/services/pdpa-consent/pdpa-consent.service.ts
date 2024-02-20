import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs';
import { FetchPdpaConsentListResponse } from '../../models/pdpa-consent/fetch-pdpa-consent-list/fetch-pdpa-consent-list-response'; 
import { FetchPdpaConsentListRequest } from '../../models/pdpa-consent/fetch-pdpa-consent-list/fetch-pdpa-consent-list-request'; 

@Injectable({
  providedIn: 'root'
})
export class PdpaConsentService {
  private baseUrl = 'https://localhost:7095/api/v1';

  constructor(private http: HttpClient) { }

  getAllPdpaConsent(request: FetchPdpaConsentListRequest): Observable<FetchPdpaConsentListResponse> {
    const apiUrl = `${this.baseUrl}/pdpa-consent-get`
    const requestBody = JSON.stringify(request);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    let options = { headers: headers };
    console.log(options)
    return this.http.post<FetchPdpaConsentListResponse>(apiUrl, requestBody, options)
      .pipe(
        map(response => {
          console.log(response)
          return <any>response;
        }),
        retry(1),
        catchError((error: HttpErrorResponse) =>
          throwError("Error - pdpa-consent service: " + error.message)
        )
      );
  }

}
