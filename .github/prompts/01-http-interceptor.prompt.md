---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.


---
title: Task 00-C – Auth Guards & Interceptor
description: Implement guards and interceptors for authenticated routes.
dependsOn: [00-A]
priority: high
---

# 🧩 Task 00-D – Auth Guards & Interceptor

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
- [ ] Role-based access enforced.

```