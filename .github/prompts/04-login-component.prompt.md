---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.

### 🧩 /tasks/00C-login-page.md
---
title: Task 00-B – Login Page
description: Build login form for Admin/Client users.
dependsOn: [00-A]
priority: critical
---

# 🧩 Task 00-C – Login Page

## 🎯 Goal
Implement a login page where users authenticate using email and password.

---

## 🧱 Component


src/app/features/auth/pages/login.component.ts
src/app/features/auth/pages/login.component.html
src/app/features/auth/pages/login.component.css


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

---