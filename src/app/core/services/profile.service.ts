import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminProfile } from '../models/profile.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);

  /**
   * Fetches the admin profile data from the API.
   * @returns Observable of AdminProfile
   */
  getProfile(): Observable<AdminProfile> {
    return this.http.get<AdminProfile>(`${environment.apiUrl}/users/profile`);
  }
}