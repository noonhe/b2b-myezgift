---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.

**add login method from CustomerAuthService to customer-login component**

Requirements:
- In `src/app/pages/auth/customer-login/customer-login.component.ts`, import the `CustomerAuthService`.
- Inject the `CustomerAuthService` into the component.
- Implement a method `onSubmit` that calls the `login` method from `CustomerAuthService`
    - provide httpClient in app.config.ts file:
    ```typescript
    ...
    export const appConfig: ApplicationConfig = {
  providers: [
    ...
    provideHttpClient(),
  ]
};
```
    - check if the pin is a valid 16 digit numeric string, if not display an error message and do not call the service.
    - Pass the `pin` from the form to the `login` method.
     - Handle the Observable returned by the `login` method:
         - save the result that contains access token and expires_in to local storage.
         - On failure, display an error message.