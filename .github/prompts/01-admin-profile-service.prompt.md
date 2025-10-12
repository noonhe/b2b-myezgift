---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.

title: – Profile Service
description: Create a service for fetching the admin's profile data 
dependsOn: []
priority: critical
---

# 🧩 – Profile Resolver
## 🎯 Goal
- create a profile.service.ts file 
- getting profile data via API (`${apiUrl}/users/profile`)
---

## 🧱 Files
```
src/app/core/services/profile.service.ts
src/app/core/models/profile.model.ts
```

### `profile.model.ts`
```ts
export enum UserRole {
  INTERNAL = 'internal',
  COMPANY = 'company'
}
export interface AdminProfile {
  user: {
    username: string,
    role: UserRole,
    email: string,
    first_name: string,
    last_name: string,
    is_active: boolean
  },
  internal_user_profile: {
    is_super_admin: boolean,
    is_scope_admin: boolean,
    is_accountant: boolean
  },
  company_user_profile: {
    is_owner: boolean
  }
}
```



### `profile.service.ts`

```ts
@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);
  private appState = inject(StateService)

  getProfile(credentials: loginCredentials): Observable<AuthResponse> {
  }
}
```