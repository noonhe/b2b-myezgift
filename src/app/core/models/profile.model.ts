export enum UserRole {
  INTERNAL = 'internal',
  COMPANY = 'company'
}

export interface AdminProfile {
  user: {
    username: string;
    role: UserRole;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
  };
  internal_user_profile: {
    is_super_admin: boolean;
    is_scope_admin: boolean;
    is_accountant: boolean;
  };
  company_user_profile: {
    is_owner: boolean;
  };
}