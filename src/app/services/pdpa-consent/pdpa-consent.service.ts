import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs';
import { FetchPdpaConsentListResponse } from '../../models/pdpa-consent/fetch-pdpa-consent-list/fetch-pdpa-consent-list-response'; 
import { FetchPdpaConsentListRequest } from '../../models/pdpa-consent/fetch-pdpa-consent-list/fetch-pdpa-consent-list-request'; 
import { PdpaConsentCreateRequest } from 'src/app/models/pdpa-consent/pdpa-consent-create/pdpa-consent-create-request';
import { PdpaConsentCreateResponse } from 'src/app/models/pdpa-consent/pdpa-consent-create/pdpa-consent-create-response';
import { PdpaConsentUpdateRequest } from 'src/app/models/pdpa-consent/pdpa-consent-update/pdpa-consent-update-request';
import { PdpaConsentUpdateResponse } from 'src/app/models/pdpa-consent/pdpa-consent-update/pdpa-consent-update-response';
import { PdpaConsentDeleteRequest } from 'src/app/models/pdpa-consent/pdpa-consent-delete/pdpa-consent-delete-request';
import { PdpaConsentDeleteResponse } from 'src/app/models/pdpa-consent/pdpa-consent-delete/pdpa-consent-delete-response';

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
    return this.http.post<FetchPdpaConsentListResponse>(apiUrl, requestBody, options)
      .pipe(
        map(response => {
          return <any>response;
        }),
        retry(1),
        catchError((error: HttpErrorResponse) =>
          throwError("Error - pdpa-consent service: " + error.message)
        )
      );
  }

  CreatePdpaConsent(request: PdpaConsentCreateRequest): Observable<PdpaConsentCreateResponse>  {
    const apiUrl = `${this.baseUrl}/pdpa-consent-create`;
      const requestBody = JSON.stringify(request);
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

  let options = { headers: headers };
    return this.http.post<PdpaConsentCreateResponse>(apiUrl, requestBody, options)
      .pipe(
        map(response => {
          return <any>response;
        }),
        retry(1),
        catchError((error: HttpErrorResponse) =>
          throwError("Error - pdpa-Consent service: " + error.message)
        )
      );
  }

  updatePdpaConsent(request: PdpaConsentUpdateRequest): Observable<PdpaConsentUpdateResponse>  {
    const apiUrl = `${this.baseUrl}/pdpa-consent-update`;
      const requestBody = JSON.stringify(request);
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

  let options = { headers: headers };
    return this.http.post<PdpaConsentUpdateResponse>(apiUrl, requestBody, options)
      .pipe(
        map(response => {
          return <any>response;
        }),
        retry(1),
        catchError((error: HttpErrorResponse) =>
          throwError("Error - pdpa-consent service: " + error.message)
        )
      );
  }


  deletePdpaConsent(request: PdpaConsentDeleteRequest): Observable<PdpaConsentDeleteResponse>  {
    const apiUrl = `${this.baseUrl}/pdpa-consent-delete`;
      const requestBody = JSON.stringify(request);
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

  let options = { headers: headers };
    return this.http.post<PdpaConsentDeleteResponse>(apiUrl, requestBody, options)
      .pipe(
        map(response => {
          return <any>response;
        }),
        retry(1),
        catchError((error: HttpErrorResponse) =>
          throwError("Error - pdpa-consent service: " + error.message)
        )
      );
  }

}
