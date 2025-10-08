## 🔐 Task 00 – Authentication & Role-Based Access

*(This will become `/tasks/00-authentication.md`)*

### 🎯 Goal

Implement the shared authentication layer for all user types (Admin, Client, Customer).
Provide login pages and route guards to protect respective dashboards.

---

### 🧠 Context

From PRD:

* **Admin**, **Client**, and **Customer** are distinct personas.
* Customers authenticate using **voucher PINs** (Task 06 later).
* Admins and Clients use platform login (email + password or SSO in future).

This task focuses on the **Admin/Client web authentication**.
Customer PIN authentication will come later as a separate flow.

---

### 🧱 Subtask Breakdown

| Sub-Task | Description                                                                                                   | Depends On |
| -------- | ------------------------------------------------------------------------------------------------------------- | ---------- |
| **00-A** | **Auth Service & Interfaces** — create reusable auth service with login/logout/token management.              | None       |
| **00-B** | **Login Page UI (Email + Password)** — build a simple reactive form, handle errors, loading, and redirection. | 00-A       |
| **00-C** | **Route Guards & Interceptors** — protect admin/client routes, attach auth token headers.                     | 00-A       |
| **00-D** | **Role-Based Routing Setup** — route to correct dashboard based on role (`/admin`, `/client`, `/customer`).   | 00-C       |

---

### 🧩 /tasks/00A-auth-service.md
---
title: Task 00-A – Auth Service & Interfaces
description: Create authentication service handling login, logout, and token storage.
dependsOn: []
priority: critical
---

# 🧩 Task 00-A – Auth Service & Interfaces

## 🎯 Goal
Provide a single `AuthService` responsible for:
- import apiUrl from environment 
- Logging in via API (`${apiUrl}/users/token`)
- refresh token via API (`${apiUrl}/users/token/refresh`)
- Persisting JWT or session token
- Tracking current user & role (`Admin`, `Client`, `Customer`)
- Logging out (clears token & redirects)

---

## 🧱 Files
```

src/app/core/services/auth.service.ts
src/app/core/models/auth.model.ts

````

### `auth.model.ts`
```ts
export interface loginCredentials {
  password: string;
  username: string;
}

export interface refreshBody{
  refresh: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}
````

### `auth.service.ts`

```ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private _currentUser = new BehaviorSubject<AuthResponse | null>(null);
  readonly currentUser$ = this._currentUser.asObservable();

  login(credentials: loginCredentials): Observable<AuthResponse> {
  }

  refreshToken(ref): Observable<{access:string}> {
  }

  logout(): void {
  }

  getToken(): string | null {
  }
}
```

---

## ✅ Completion

* [ ] `AuthService` implemented & tested with mock API.
* [ ] Token stored in `localStorage`.
* [ ] Observable currentUser stream works correctly.

````

---

### 🧩 /tasks/00B-login-page.md
```md
---
title: Task 00-B – Login Page
description: Build login form for Admin/Client users.
dependsOn: [00-A]
priority: critical
---

# 🧩 Task 00-B – Login Page

## 🎯 Goal
Implement a login page where users authenticate using email and password.

---

## 🧱 Component
````

src/app/features/auth/pages/login.component.ts
src/app/features/auth/pages/login.component.html
src/app/features/auth/pages/login.component.css

```

### Behavior
- Reactive form: `username`, `password`.
- On submit → calls `AuthService.login()`.
- On success → redirect based on role:
  - Admin → `/admin/dashboard`
  - Client → `/client/dashboard`
- Show loading spinner + error messages.

### UI
- Clean, minimal layout (Tailwind or Angular Material form).
- Inputs labeled & accessible.
- Validation: email format, required fields.

---

## ✅ Completion
- [ ] Login form functional with mocked backend.
- [ ] Handles success & error states.
- [ ] Role-based redirect works.
```

---

### 🧩 /tasks/00C-route-guards.md

```md
---
title: Task 00-C – Auth Guards & Interceptor
description: Implement guards and interceptors for authenticated routes.
dependsOn: [00-A]
priority: high
---

# 🧩 Task 00-C – Auth Guards & Interceptor

## 🎯 Goal
Secure routes and automatically attach auth tokens to all HTTP requests.

---

## 🧱 Guards
**Files:**
```

src/app/core/guards/auth.guard.ts
src/app/core/guards/role.guard.ts

```

### AuthGuard
- Checks for valid token via `AuthService.getToken()`.
- Redirects to `/login` if missing.

### RoleGuard
- Checks if current user role matches required route data (e.g. `{ role: 'Admin' }`).
- Redirects to `/unauthorized` otherwise.

---

## 🧱 Interceptor
**File:** `src/app/core/interceptors/auth.interceptor.ts`
- Reads token from `AuthService.getToken()`.
- Adds `Authorization: Bearer <token>` header.

---

## ✅ Completion
- [ ] Guards + interceptor registered via `provideHttpClient(withInterceptors(...))`.
- [ ] Protected routes redirect unauthenticated users.
```

---

### 🧩 /tasks/00D-role-routing.md

```md
---
title: Task 00-D – Role-Based Routing Setup
description: Configure main app routes with role guards and redirection.
dependsOn: [00-B, 00-C]
priority: high
---

# 🧩 Task 00-D – Role-Based Routing Setup

## 🎯 Goal
Define role-based routes and redirection logic.

---

## 🧱 Routes
```

src/app/app.routes.ts

````

### Example
```ts
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/pages/login.page').then(m => m.LoginPage) },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' },
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
  {
    path: 'client',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Client' },
    loadChildren: () => import('./features/client/client.routes').then(m => m.CLIENT_ROUTES),
  },
  { path: '**', redirectTo: 'login' }
];
````

---

## ✅ Completion

* [ ] Role-based route protection implemented.
* [ ] Redirects to dashboard per role after login.
* [ ] Guards integrated with router.

```

---

## 🔚 Summary

| Step | Purpose |
|------|----------|
| **00-A** | Core Auth service & state management |
| **00-B** | Login page UI & role-based redirect |
| **00-C** | Guards & interceptor for token handling |
| **00-D** | Role-based routing configuration |
---
