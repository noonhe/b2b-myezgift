---
applyTo: '**/services/*.service.ts'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

## Services

* Each service = **one responsibility**.
* `@Injectable({ providedIn: 'root' })` unless scoped.
* Use RxJS `BehaviorSubject` or `ReplaySubject` for state.
* Expose `Observable` (never mutable subject).
* No HttpClient calls inside components.
* Use `inject()` for dependencies (no constructor).
* Handle errors with RxJS `catchError`.
* Use environment variables for API URLs.
* Persist tokens in `localStorage` or `sessionStorage`.
* Write unit tests for all service methods.
* Follow Angular Style Guide and project conventions.
* Document public methods with JSDoc.
* Use TypeScript interfaces for data models.
* Avoid business logic in services; delegate to utility functions or separate classes if complex.
* Ensure services are tree-shakable and optimized for production builds.
* Use async/await with RxJS `firstValueFrom` or `lastValueFrom` for one-time HTTP calls if needed.
* Use Angular's `HttpInterceptor` for cross-cutting concerns like adding auth headers or logging.
* Ensure services are stateless where possible; avoid storing unnecessary state that can lead to side effects.


## state management with signals
* For simple state management, consider using Angular's built-in signals.
* Signals provide a more intuitive way to manage state changes and reactivity in your components.
* Use `signal()`, `computed()`, and `effect()` from `@angular/core` for reactive state management.
* Prefer signals over BehaviorSubject/ReplaySubject for new implementations unless specific RxJS features are required.
* Ensure to clean up any subscriptions or effects to prevent memory leaks.
* Document the use of signals in your services for clarity and maintainability.
example:
```ts
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginCredentials, AuthResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private _currentUser = signal<AuthResponse | null>(null);
  readonly currentUser$ = computed(() => this._currentUser());

  login(credentials: loginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap(response => this._currentUser.set(response))
    );
  }

  refreshToken(ref): Observable<{access:string}> {
    return this.http.post<{access:string}>(`${environment.apiUrl}/auth/refresh`, { refresh: ref }).pipe(
      tap(response => {
        const current = this._currentUser();
        if (current) {
          this._currentUser.set({ ...current, access: response.access });
        }
      })
    );
  }

  logout(): void {
    this._currentUser.set(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }

  getToken(): string | null {
    const current = this._currentUser();
    return current ? current.access : null;
  }
}
```
