import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CustomerAuthBody, CustomerAuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  login(body: CustomerAuthBody): Observable<CustomerAuthResponse> {
    return this.http.post<CustomerAuthResponse>(`${this.apiUrl}/vouchers/customers/login`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}