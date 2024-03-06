import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs';
import { FeatchPdpaPrivacyListRequest } from 'src/app/models/pdpa-privacy/featch-pdpa-privacy-list/featch-pdpa-privacy-list-request';
import { FeatchPdpaPrivacyListResponse } from 'src/app/models/pdpa-privacy/featch-pdpa-privacy-list/featch-pdpa-privacy-list-response';
import { PdpaPrivacyDeleteRequest } from 'src/app/models/pdpa-privacy/pdpa-privacy-delete/pdpa-privacy-delete-request';
import { PdpaPrivacyDeleteResponse } from 'src/app/models/pdpa-privacy/pdpa-privacy-delete/pdpa-privacy-delete-response';
import { PdpaPrivacyUpdateRequest } from 'src/app/models/pdpa-privacy/pdpa-privacy-update/pdpa-privacy-update-request';
import { PdpaPrivacyUpdateResponse } from 'src/app/models/pdpa-privacy/pdpa-privacy-update/pdpa-privacy-update-response';
import { PdpaPrivacyCreateResponse } from 'src/app/models/pdpa-privacy/pdpa-privacy-create/pdpa-privacy-create-response';
import { PdpaPrivacyCreateRequest } from 'src/app/models/pdpa-privacy/pdpa-privacy-create/pdpa-privacy-create-request';

@Injectable({
  providedIn: 'root'
})

export class PdpaPrivacyService {
  private baseUrl = 'https://localhost:7095/api/v1';

  constructor(private http: HttpClient) { }

  getAllPdpaPrivacy(request: FeatchPdpaPrivacyListRequest): Observable<FeatchPdpaPrivacyListResponse>{
    const apiUrl = `${this.baseUrl}/pdpa-privacy-get`
    const requestBody = JSON.stringify(request);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    let options = { headers: headers };
    console.log(options)
    return this.http.post<FeatchPdpaPrivacyListResponse>(apiUrl, requestBody, options)
      .pipe(
        map(response => {
          console.log(response)
          return <any>response;
        }),
        retry(1),
        catchError((error: HttpErrorResponse) =>
          throwError("Error - pdpa-privacy service: " + error.message)
        )
      );
  }

  CreatePdpaPrivacy(request: PdpaPrivacyCreateRequest): Observable<PdpaPrivacyCreateResponse>  {
    const apiUrl = `${this.baseUrl}/pdpa-privacy-create`;
      const requestBody = JSON.stringify(request);
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

  let options = { headers: headers };
    return this.http.post<PdpaPrivacyCreateResponse>(apiUrl, requestBody, options)
      .pipe(
        map(response => {
          return <any>response;
        }),
        retry(1),
        catchError((error: HttpErrorResponse) =>
          throwError("Error - pdpa-privacy service: " + error.message)
        )
      );
  }

  updatePdpaPrivacy(request: PdpaPrivacyUpdateRequest): Observable<PdpaPrivacyUpdateResponse>  {
    const apiUrl = `${this.baseUrl}/pdpa-privacy-update`;
      const requestBody = JSON.stringify(request);
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

  let options = { headers: headers };
    return this.http.post<PdpaPrivacyUpdateResponse>(apiUrl, requestBody, options)
      .pipe(
        map(response => {
          return <any>response;
        }),
        retry(1),
        catchError((error: HttpErrorResponse) =>
          throwError("Error - pdpa-privacy service: " + error.message)
        )
      );
  }


  deletePdpaPrivacy(request: PdpaPrivacyDeleteRequest): Observable<PdpaPrivacyDeleteResponse>  {
    const apiUrl = `${this.baseUrl}/pdpa-privacy-delete`;
      const requestBody = JSON.stringify(request);
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

  let options = { headers: headers };
    return this.http.post<PdpaPrivacyDeleteResponse>(apiUrl, requestBody, options)
      .pipe(
        map(response => {
          return <any>response;
        }),
        retry(1),
        catchError((error: HttpErrorResponse) =>
          throwError("Error - pdpa-privacy service: " + error.message)
        )
      );
  }
}