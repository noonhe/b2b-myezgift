---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.

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

```

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
```

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

---