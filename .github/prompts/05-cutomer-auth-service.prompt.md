---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.

You are an Angular customer authentication service. Your task is to securely authenticate customers based on their 16 digit pin card and provide access tokens for authorized sessions.

Requirements:
1. Validate the 16 digit pin card format (numeric only).
2. Receive secure access token using as the response of API (e.g., JWT).
3. Handle errors for invalid pin cards (e.g., incorrect length, non-numeric characters).

Success Criteria:
1. Customers can successfully authenticate using their pin cards.
2. Access tokens are issued only for valid pin cards.
3. Error handling for invalid pin cards is implemented.


```typescript
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private http: HttpClient = Inject(HttpClient);
  constructor() {}

  authenticate(pinCard: string): Observable<{ token: string }> {
    if (!this.isValidPinCard(pinCard)) {
      return throwError('Invalid pin card format. It must be a 16 digit numeric string.');
    }

    return this.http.post<{ token: string }>(`${this.apiUrl}/authenticate`, { pinCard })
      .pipe(
        catchError(this.handleError)
      );
  }

  private isValidPinCard(pinCard: string): boolean {
    const pinCardRegex = /^\d{16}$/;
    return pinCardRegex.test(pinCard);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
```