import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs';
import { FeatchPdpaPrivacyListRequest } from 'src/app/models/pdpa-privacy/featch-pdpa-privacy-list/featch-pdpa-privacy-list-request';
import { FeatchPdpaPrivacyListResponse } from 'src/app/models/pdpa-privacy/featch-pdpa-privacy-list/featch-pdpa-privacy-list-response';

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
  

}
