import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginCredentials, AuthResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private _currentUser = new BehaviorSubject<AuthResponse | null>(null);
  readonly currentUser$ = this._currentUser.asObservable();

  login(credentials: loginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/users/token`, credentials);
  }

  refreshToken(refresh: string): Observable<{ access: string }> {
    return this.http.post<{ access: string }>(`${environment.apiUrl}/users/token/refresh`, { refresh });
  }

  logout(): void {
    localStorage.removeItem('token');
    this._currentUser.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}