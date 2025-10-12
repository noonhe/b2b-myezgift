---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.

title: – auth routes
description: Create route configuration for authentication
dependsOn: []
priority: critical
---

# 🧩 – Auth Routes
## 🎯 Goal
- create auth routes for login in app.routes.ts file
---

## 🧱 create new components
```
src/app/pages/auth/home/home.component.ts
src/app/pages/auth/home/home.component.html
src/app/pages/auth/home/home.component.css
src/app/pages/auth/admin-login/admin-login.component.ts
src/app/pages/auth/admin-login/admin-login.component.html
src/app/pages/auth/admin-login/admin-login.component.css
src/app/pages/auth/customer-login/customer-login.component.ts
src/app/pages/auth/customer-login/customer-login.component.html
src/app/pages/auth/customer-login/customer-login.component.css
```

## 🛠️ Tasks
-modify app.routes.ts file to include auth routes
```ts
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';

const authRoutes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'auth/admin', component: AdminLoginComponent },
  { path: 'auth/customer', component: CustomerLoginComponent },
  
];

export default authRoutes;