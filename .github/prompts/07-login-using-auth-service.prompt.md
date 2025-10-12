---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.

**add login method from authService to admin-login component**

Requirements:
- In `src/app/pages/auth/admin-login/admin-login.component.ts`, import the `AuthService`.
- Inject the `AuthService` into the component.
- Implement a method `onSubmit` that calls the `login` method from `AuthService` 
  
    - Pass the username and password from the form to the `login` method.
     - Handle the Observable returned by the `login` method:
         - save the result that contains access and refresh tokens to local storage.
         - On failure, display an error message.