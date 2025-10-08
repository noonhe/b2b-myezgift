import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { loginCredentials, AuthResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should log in and return an AuthResponse', () => {
    const mockResponse: AuthResponse = { access: 'access-token', refresh: 'refresh-token' };
    const credentials: loginCredentials = { username: 'test', password: 'password' };

    service.login(credentials).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/token`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should refresh the token', () => {
    const mockResponse = { access: 'new-access-token' };

    service.refreshToken('refresh-token').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/token/refresh`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should clear token on logout', () => {
    spyOn(localStorage, 'removeItem');
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});