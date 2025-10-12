export interface loginCredentials {
  password: string;
  username: string;
}

export interface refreshBody {
  refresh: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface CustomerAuthBody {
  pin: string;
}

export interface CustomerAuthResponse {
  access: string;
  expires_in: number;
}