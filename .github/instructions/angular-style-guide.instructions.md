---
applyTo: '**'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

# 🧭 Angular Frontend Development Rules (for AI Agents)

**Project:** myEzGift – B2E Gift Card Platform
**Goal:** Production-ready, maintainable Angular frontend using **standalone components only**.

---

## 🔧 AI Agent Instructions

* Follow these rules **strictly**.
* Use **standalone APIs only** (no NgModules).
* Code must be **clean, DRY, maintainable, and accessible**.
* Prefer **simplicity and consistency** over cleverness.
* If a solution breaks a rule, **propose a compliant alternative**.
* Always generate **production-grade TypeScript + HTML + CSS**.

---

## 1. Architecture & Structure

```
src/app/
  core/       # singleton services, interceptors, guards
  shared/     # reusable components, pipes, directives
  features/   # feature-specific folders
    feature-name/
      pages/
      components/
      services/
      models/
  app.config.ts  # provideRouter, global providers
```

* No `AppModule`; bootstrap with `bootstrapApplication()`.
* Routing defined via `app.routes.ts` and `provideRouter()`.
* Components import dependencies directly in `imports: []`.

---

## 2. Naming

| Type            | Convention                      | Example                  |
| --------------- | ------------------------------- | ------------------------ |
| Files           | kebab-case                      | `user-card.component.ts` |
| Classes         | PascalCase                      | `UserCardComponent`      |
| Interfaces      | PascalCase, optional `I` prefix | `IUser`                  |
| Properties/vars | camelCase                       | `userName`               |
| Constants       | UPPER_SNAKE_CASE                | `API_URL`                |

---

## 3. SOLID Principles in Angular

### 3.1. Single Responsibility Principle (SRP)

*   **Components**: A component should focus on presenting data and handling user interactions related to its specific UI.
*   **Services**: A service should have one clear responsibility (e.g., `UserService` for user data, `AuthService` for authentication).

### 3.2. Open/Closed Principle (OCP)

*   Software entities (classes, functions, etc.) should be open for extension, but closed for modification.
*   **In Angular**: Use inheritance or composition (e.g., through abstract classes, interfaces, or dependency injection) to extend functionality without altering existing code. Create new services or components that build upon existing ones.

### 3.3. Liskov Substitution Principle (LSP)

*   If `S` is a subtype of `T`, then objects of type `T` may be replaced with objects of type `S` without altering any of the desirable properties of `T`.
*   **In Angular**: When extending a component or implementing an interface, ensure that the derived class can be used interchangeably with the base class/interface without unexpected behavior. This often applies to shared interfaces and abstract classes.

### 3.4. Interface Segregation Principle (ISP)

*   Clients should not be forced to depend on interfaces they do not use.
*   **In Angular**: Create small, specific interfaces instead of large, monolithic ones. If a service or component only needs a subset of an interface's methods, it should only depend on that subset.

    ```typescript
    // Bad
    interface IUserService {
      getUser(id: string): Observable<User>;
      createUser(user: User): Observable<User>;
      updateUser(user: User): Observable<User>;
      deleteUser(id: string): Observable<void>;
      // ... many other unrelated methods
    }

    // Good
    interface IReadableUserService {
      getUser(id: string): Observable<User>;
    }

    interface IWritableUserService {
      createUser(user: User): Observable<User>;
      updateUser(user: User): Observable<User>;
      deleteUser(id: string): Observable<void>;
    }
    ```

### 3.5. Dependency Inversion Principle (DIP)

*   High-level modules should not depend on low-level modules. Both should depend on abstractions.
*   Abstractions should not depend on details. Details should depend on abstractions.
*   **In Angular**: Use interfaces for services when injecting them. This allows for easier testing (mocking) and swapping out implementations.

    ```typescript
    // user-api.interface.ts
    export interface IUserApi {
      getUsers(): Observable<IUser[]>;
      getUser(id: string): Observable<IUser>;
    }

    // real-user.service.ts (low-level, depends on abstraction)
    @Injectable({
      providedIn: 'root'
    })
    export class RealUserService implements IUserApi {
      constructor(private http: HttpClient) {}
      getUsers(): Observable<IUser[]> { /* ... */ }
      getUser(id: string): Observable<IUser> { /* ... */ }
    }

    // user.facade.ts (high-level, depends on abstraction)
    @Injectable({
      providedIn: 'root'
    })
    export class UserFacadeService {
      constructor(@Inject('IUserApi') private userApiService: IUserApi) {}
      getUsersData(): Observable<IUser[]> {
        return this.userApiService.getUsers();
      }
    }

    // In a app.config.ts, provide the concrete implementation for the abstraction
    export const appConfig: ApplicationConfig = {
      providers: [
        { provide: 'IUserApi', useClass: RealUserService }
      ]
    };
  ```

---

## 4. Performance

* Use **lazy loading**.
* Optimize change detection (`OnPush`).
* Debounce user inputs.
* Compress and lazy-load images.
* Use virtual scrolling for long lists.
* Cache observables via `shareReplay(1)`.

---

## 5. Clean Code

* No magic strings/numbers — use constants or enums.
* Meaningful variable and function names.
* Keep functions small and focused.
* Comment *why*, not *what*.
* Use ESLint + Prettier.
* Commit with [Conventional Commits](https://www.conventionalcommits.org/).

---

## 6. Testing

* Unit test all components, pipes, and services.
* Use TestBed for Angular testing.
* Mock dependencies; test async properly.
* E2E with Cypress or Playwright for main flows.

---

## 7. Functional & Reactive Programming

* Prefer **pure functions**.
* Avoid mutation — use immutable updates.
* Use RxJS for async flow instead of imperative logic.

---

✅ **Summary**

* Standalone Angular only.
* Use OnPush, typed observables, and clean architecture.
* Keep UI accessible and semantic.
* Services = single responsibility + observable state.
* Smart vs dumb separation.
* No NgModules, no duplicated logic, no hidden subscriptions.

---

