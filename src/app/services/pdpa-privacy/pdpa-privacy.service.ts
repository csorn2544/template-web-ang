import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs';
import { FetchPdpaPrivacyListRequest } from 'src/app/models/pdpa-privacy/fetch-pdpa-privacy-list/fetch-pdpa-privacy-list-request';
import { FetchPdpaPrivacyListResponse } from 'src/app/models/pdpa-privacy/fetch-pdpa-privacy-list/fetch-pdpa-privacy-list-response';

@Injectable({
  providedIn: 'root'
})

export class PdpaPrivacyService {
  private baseUrl = 'https://localhost:7095/api/v1';

  constructor(private http: HttpClient) { }

  getAllPdpaPrivacy(request: FetchPdpaPrivacyListRequest): Observable<FetchPdpaPrivacyListResponse>{
    const apiUrl = `${this.baseUrl}/pdpa-privacy-get`
    const requestBody = JSON.stringify(request);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    let options = { headers: headers };
    return this.http.post<FetchPdpaPrivacyListResponse>(apiUrl, requestBody, options)
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
  

}
