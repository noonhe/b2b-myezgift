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