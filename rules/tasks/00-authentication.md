


---

### 🧩 /tasks/00E-role-routing.md

```md
---
title: Task 00-D – Role-Based Routing Setup
description: Configure main app routes with role guards and redirection.
dependsOn: [00-B, 00-C]
priority: high
---

# 🧩 Task 00-E – Role-Based Routing Setup

## 🎯 Goal
Define role-based routes and redirection logic.

---

## 🧱 Routes
```

src/app/app.routes.ts

```

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
```

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
