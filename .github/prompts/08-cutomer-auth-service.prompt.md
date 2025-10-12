---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.
---
**Implement Customer Authentication Service in Angular**

Requirements:
1. create a new service named `CustomerAuthService` in the `src/app/core/services` directory.


files: 
- `src/app/core/services/customer-auth.service.ts`

add this model to `src/app/core/models/auth.model.ts`:
```typescript
export interface CustomerAuthBody {
  pin: string;
}
export interface CustomerAuthResponse {
  access: string,
  expires_in: number
}
```



```typescript
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthService {
  private apiUrl = environment.apiUrl;
  private http: HttpClient = Inject(HttpClient);
  constructor() {}

  authenticate(body: CustomerAuthBody): Observable<CustomerAuthResponse> {
    return this.http.post<CustomerAuthResponse>(`${this.apiUrl}/vouchers/customers/login`, body)
      .pipe(
        catchError(this.handleError)
      );
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
    return throwError(() => errorMessage);
  }
}
```