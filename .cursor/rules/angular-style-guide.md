---
description: Angular Frontend Development Style Guide and Technical Specification
globs: 
alwaysApply: true
---
# Angular Frontend Development Style Guide and Technical Specification

This document defines the rules and conventions for building Angular projects with **standalone components only** (no NgModules).  
The goal is to ensure consistency, maintainability, performance, accessibility, and clean code across all projects.

---

## Instructions for AI Coding Agents
When generating or modifying Angular code in this project:  
- **Always follow the rules below**.  
- **Do not generate NgModules. Use standalone APIs only.**  
- If a solution would violate a rule, **propose a compliant alternative instead**.  
- Code must be **production-ready, readable, and maintainable**.  
- Prefer **consistency** over cleverness. 

---

## 1. General Principles

### 1.1. Keep It Simple, Stupid (KISS)

Favor simplicity over complexity. Write code that is easy to understand and maintain. Avoid over-engineering solutions.

### 1.2. Don't Repeat Yourself (DRY)

Avoid duplicating code. Abstract common logic into reusable components, services, or functions.

### 1.3. You Ain't Gonna Need It (YAGNI)

Do not add functionality until it's actually needed. Avoid speculative development.

### 1.4. Single Source of Truth (SSOT)

Ensure that every piece of information has a single, unambiguous representation within the system.

---

## 2. Angular Best Practices

### 2.1. Project Structure

*   **`src/app`**: Contains all application-specific code.
    *   **`core`**: Core services, singletons, interceptors, guards.
    *   **`shared`**: Reusable components, pipes, directives
    *   **`features`**: Contains feature-specific folders each containing standalone components, and services.
        *   **`feature-name`**:
            *   **`components`**: Feature-specific components.
            *   **`pages`**: Components acting as full-page views.
            *   **`services`**: Feature-specific services.
            *   **`models`**: Interfaces and types.
            *   **`app.config.ts`**: Root App configuration (routing, providers).
*   **`public`**: Static assets like images, fonts, and external JSON files.
*   **`environments`**: Environment-specific configuration files.
-   No `AppModule` — bootstrap with `bootstrapApplication`.  
-   Routing is defined via `app.routes.ts` and `provideRouter()`.  
-   Shared functionality is imported directly in components via `imports: []`.

### 2.2. Naming Conventions

*   **Files**: kebab-case (e.g., `my-component.component.ts`, `user-list.service.ts`).
*   **Classes**: PascalCase (e.g., `MyComponent`, `UserListComponent`).
*   **Interfaces**: PascalCase, prefixed with `I` (optional, but good practice for clarity) (e.g., `IUser`, `IProduct`).
*   **Properties/Variables**: camelCase (e.g., `userName`, `productList`).
*   **Constants**: UPPER_SNAKE_CASE (e.g., `API_URL`, `DEFAULT_TIMEOUT`).
*   **Standalone Components**: PascalCase, suffixed with `Component` (e.g., `HeaderComponent`, `ProductDetailComponent`).
*   **Services**: PascalCase, suffixed with `Service` (e.g., `UserService`, `AuthService`).
*   **Directives**: PascalCase, suffixed with `Directive` (e.g., `HighlightDirective`).
*   **Pipes**: PascalCase, suffixed with `Pipe` (e.g., `CurrencyFormatPipe`).

### 2.3. Components (Standalone)

*   **Always declared with `standalone: true`**.
*   **Import dependencies directly in the component’s `imports` array**
*   **One Component Per File**: Each component (and its associated template, styles, and test files) should reside in its own folder.

*   **Input/Output Naming**:
    *   Inputs: Use `camelCase` (e.g., `@Input() userId: string;`).
    *   Outputs: Use `camelCase` for the event name, suffixed with `Event` if it dispatches an event (e.g., `@Output() userSelected = new EventEmitter<User>();`).
*   **Lifecycle Hooks**: Understand and use lifecycle hooks appropriately (`OnInit`, `OnDestroy`, `OnChanges`, etc.). Implement `OnDestroy` to unsubscribe from observables to prevent memory leaks.
*   **Smart vs. Dumb Components (Container vs. Presentational)**:
    *   **Dumb/Presentational Components**:
        *   Receive data via `@Input()`.
        *   Emit events via `@Output()`.
        *   Focus solely on UI rendering.
        *   No direct dependency on services (unless it's a UI-utility service like a modal service).
        *   Easily testable.
    *   **Smart/Container Components**:
        *   Responsible for fetching data from services.
        *   Manage application state.
        *   Pass data down to dumb components.
        *   Handle user interactions from dumb components.
*   Components must remain **thin** — delegate logic to services.  
*   Use **OnPush change detection** by default unless a specific case requires Default.  
*   Keep components **under ~300 lines**.
Example:

```typescript
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent { ... }
```

### 2.4. Services
*   Services handle **business logic, state, and data flow**
*   **Single Responsibility Principle (SRP)**: Each service should have a single, well-defined responsibility.
*   **`@Injectable()`**: Always add `@Injectable({ providedIn: 'root' })` for application-wide singletons, or or feature-specific provider via providers in a standalone component/route.
*   **Data Fetching**: Services are the primary place for fetching data from APIs.
*   **State Management (without library)**:
    *   Use services with RxJS `BehaviorSubject` or `ReplaySubject` to manage and expose application state.
    *   Each piece of global or shared state should have a dedicated service.
    *   Never expose mutable subjects directly to components.
    *   Expose state as an `Observable` using `.asObservable()` to prevent external modification.

    ```typescript
    // user.service.ts
    import { Injectable } from '@angular/core';
    import { BehaviorSubject, Observable } from 'rxjs';
    import { IUser } from '../models/user.model';

    @Injectable({
      providedIn: 'root'
    })
    export class UserService {
      private _currentUser = new BehaviorSubject<IUser | null>(null);
      readonly currentUser$: Observable<IUser | null> = this._currentUser.asObservable();

      constructor() { }

      setCurrentUser(user: IUser | null): void {
        this._currentUser.next(user);
      }

      // Other user-related methods (e.g., fetchUser, updateUser)
    }
    ```

    ```typescript
    // my-component.component.ts
    import { Component, OnInit, OnDestroy } from '@angular/core';
    import { UserService } from '../services/user.service';
    import { IUser } from '../models/user.model';
    import { Subscription } from 'rxjs';

    @Component({
      selector: 'app-my-component',
      standalone: true,
      template: `
        <div *ngIf="currentUser">Welcome, {{ currentUser.name }}</div>
        <button (click)="login()">Login</button>
      `
    })
    export class MyComponent implements OnInit, OnDestroy {
      currentUser: IUser | null = null;
      private userSubscription: Subscription | undefined;
      private userService = inject(UserService);
      constructor() { }

      ngOnInit(): void {
        this.userSubscription = this.userService.currentUser$.subscribe(user => {
          this.currentUser = user;
        });
      }

      login(): void {
        const mockUser: IUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
        this.userService.setCurrentUser(mockUser);
      }

      ngOnDestroy(): void {
        this.userSubscription?.unsubscribe();
      }
    }
    ```.

### 2.5. Routing

*   Define routes in `app.routes.ts` 
*   Use provideRouter(routes) in `main.ts` or `app.config.ts`
*   Use lazy loading with `loadComponent` or `loadChildren` (for route-level providers). 
*   **Route Guards**: Use `CanActivate`, `CanDeactivate`, `CanLoad`, `Resolve` for authentication, authorization, and data pre-fetching. Guards must remain **focused** (AuthGuard ≠ RoleGuard). Never put business logic directly inside guards — delegate to services. Use route guards (standalone classes with inject()).

```typescript
export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./features/users/pages/user-list.page').then(m => m.UserListPage)
  }
];

```

### 2.6. Dependency Injection

*   Use Angular’s DI with `inject()` or constructor injection.
*   **Provide Dependencies at the Right Level**: `root` for global singletons. `providers: []` in component/route for scoped services.

### 2.7. Models & Interfaces

*   Use **interfaces** for data shapes (DTOs, API responses).
*   Use **classes** for domain entities with behavior (methods, validation, computed properties).  
*   Keep models clean — no Angular decorators inside them.  

### 2.8. HTTP & APIs

*   Use Angular **HttpClient** inside services only.  
*   All API calls go through **dedicated services** (e.g., `UserApiService`).  
*   Never call HttpClient directly in components.  
*   Use **interceptors** for auth tokens, logging, error handling.  
*   Handle errors gracefully with RxJS (`catchError`).  

### 2.9 Pipes
*   Pipes must be **pure** unless explicitly required (e.g., `AsyncPipe`).  
*   Use pipes for **data formatting**, not for business logic.  
*   Keep pipe functions short and reusable.  

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

## 4. RxJS Best Practices

*   **Unsubscribe**: Always unsubscribe from long-lived observables (`Subscription.unsubscribe()`) in `ngOnDestroy()` to prevent memory leaks, especially for manually subscribed observables.
*   **`async` pipe**: Prefer the `async` pipe in templates for automatically subscribing and unsubscribing from observables. This simplifies component code significantly.
*   Use `takeUntil` or `destroyRef` for manual cleanup.

    ```html
    <!-- Good -->
    <div *ngIf="data$ | async as data">{{ data.name }}</div>
    ```

    ```typescript
    // Bad (manual subscription)
    ngOnInit() {
      this.dataSubscription = this.myService.getData().subscribe(data => {
        this.data = data;
      });
    }

    ngOnDestroy() {
      this.dataSubscription?.unsubscribe();
    }
    ```

*   **Operators**:
    *   Use `pipe()` to chain RxJS operators.
    *   **Transformation Operators**: `map`, `switchMap`, `mergeMap`, `concatMap`, `exhaustMap`. Understand their differences for handling nested observables. `switchMap` is often preferred for "latest value wins" scenarios (e.g., typeahead search).
    *   **Filtering Operators**: `filter`, `take`, `takeUntil`, `debounceTime`, `distinctUntilChanged`.
    *   **Combination Operators**: `combineLatest`, `forkJoin`, `zip`.
    *   **Error Handling**: Use `catchError` within the `pipe()` to gracefully handle errors from observables.
    *   **Completion**: Use `take(1)` or `first()` for observables that are expected to complete after emitting a single value (e.g., HTTP requests).
    *   `shareReplay()`: Use `shareReplay` to make an observable hot and share its execution among multiple subscribers, preventing multiple API calls for the same data.

    ```typescript
    // Example with shareReplay
    export class ProductService {
      private productsCache$: Observable<IProduct[]> | undefined;

      constructor(private http: HttpClient) { }

      getProducts(): Observable<IProduct[]> {
        if (!this.productsCache$) {
          this.productsCache$ = this.http.get<IProduct[]>('/api/products').pipe(
            shareReplay(1) // Cache the last emitted value and replay it to new subscribers
          );
        }
        return this.productsCache$;
      }
    }
    ```

*   **State Management with Subjects**: As described in "2.4. Services", use `BehaviorSubject` or `ReplaySubject` within services to manage and propagate state changes.

---

## 5. HTML Best Practices

*   **Semantic HTML**: Use semantic HTML elements (e.g., `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<section>`, `<article>`) to provide meaning to content, improve accessibility, and aid SEO.
*   **Attributes**:
    *   Always include `alt` attributes for `<img>` tags, even if empty (for decorative images).
    *   Use `type` attribute for `<input>` elements (e.g., `text`, `email`, `password`, `number`).
    *   Use `aria-*` attributes for enhanced accessibility where native HTML semantics are insufficient.
*   **Structure**: Organize HTML for readability and maintainability. Indent properly.
*   **Angular Directives**:
    *   `*ngIf`, `*ngFor`, `[ngClass]`, `[ngStyle]`, `[ngModel]`.
    *   Use `trackBy` with `*ngFor` for performance optimization, especially with large lists.

    ```html
    <li *ngFor="let item of items; trackBy: trackById">
      {{ item.name }}
    </li>
    ```

    ```typescript
    trackById(index: number, item: any): string {
      return item.id;
    }
    ```

---

## 6. CSS Best Practices

*   **Component-Scoped Styles**: Use Angular's component-scoped styles (via `styleUrls` or `styles` in `@Component`) to encapsulate styles and prevent global style conflicts.
*   **BEM (Block Element Modifier)**: Consider using BEM methodology for naming CSS classes to create modular and reusable styles.
    *   `block-name`
    *   `block-name__element-name`
    *   `block-name--modifier-name`

*   **Variables**: Use CSS custom properties for colors, fonts, spacing, etc., to ensure consistency and easy updates.
*   **Units**: Use `rem` or `em` for font sizes and spacing for better scalability and accessibility, reserving `px` for borders or specific fixed sizes.
*   **Media Queries**: Implement responsive design using media queries.
*   **Avoid `!important`**: Only use `!important` as a last resort in very specific override scenarios.
*   **Ordering CSS Properties**: Group related CSS properties (e.g., layout, box model, typography, color, other).

---

## 7. Accessibility (A11y)

*   **Semantic HTML**: As mentioned, use correct semantic elements.
*   **ARIA Attributes**: Use ARIA attributes (`aria-label`, `aria-describedby`, `aria-hidden`, `role`, etc.) when native HTML semantics are insufficient to convey meaning to assistive technologies.
    *   `aria-label`: Provides an accessible name for an element when no visible label exists.
    *   `aria-describedby`: Refers to an element that describes the current element.
    *   `role`: Defines the purpose of an element when its native role is not appropriate.
*   **Keyboard Navigation**: Ensure all interactive elements are reachable and operable via keyboard (Tab, Shift+Tab, Enter, Spacebar).
*   **Focus Management**: Manage focus carefully, especially after dynamic content changes (e.g., opening a modal, loading new content). Ensure focus returns to a logical place.
*   **Color Contrast**: Ensure sufficient color contrast between text and background for readability (WCAG AA standard: 4.5:1 for normal text, 3:1 for large text).
*   **Form Labels**: Always associate labels with form inputs using the `for` and `id` attributes.
*   **Image Alt Text**: Provide descriptive `alt` text for all meaningful images. Use `alt=""` for decorative images.
*   **Headings**: Use headings (`<h1>` to `<h6>`) to structure content hierarchically. Avoid skipping heading levels.
*   **Language Attribute**: Set the `lang` attribute on the `<html>` tag to indicate the document's primary language.

---

## 8. Performance

*   **Lazy Loading components**: Load components only when needed.
*   **Tree Shaking**: Ensure unused code is removed from the production bundle.
*   **Change Detection Strategy**:
    *   Use `ChangeDetectionStrategy.OnPush` for components where inputs are immutable or observable, to reduce the number of change detection cycles.

    ```typescript
    @Component({
      selector: 'app-my-component',
      templateUrl: './my-component.component.html',
      styleUrls: ['./my-component.component.css'],
      standalone: true,
      imports: [],
      changeDetection: ChangeDetectionStrategy.OnPush // Apply OnPush strategy
    })
    export class MyComponent {
      @Input() data: any; // Assuming data is immutable
    }
    ```

*   **Debounce User Input**: Use `debounceTime` with RxJS for events like search input to prevent excessive function calls.
*   **Optimize Images**: Compress images, use appropriate formats (WebP where supported), and consider lazy loading images.
*   **Virtual Scrolling**: For very long lists, use Angular CDK's virtual scrolling to render only the visible items.
*   **Minify and Gzip Assets**: Ensure production builds minify CSS, HTML, and JavaScript, and that the server Gzips or Brotli compresses assets.
*   **Web Workers**: For CPU-intensive tasks, consider offloading them to Web Workers to keep the UI thread free.
*   **Bundle Analysis**: Use tools like Webpack Bundle Analyzer to identify large dependencies and optimize bundle size.
*   **HTTP Interceptors**: Implement caching at the HTTP level for frequently requested data.

---

## 9. Clean Code and Architecture

*   **Consistency**: Adhere strictly to the established style guide.
*   **Readability**: Write code that is easy to read and understand. Use meaningful variable and function names.
*   **Comments**: Use comments judiciously to explain *why* certain decisions were made, not *what* the code does (unless the code is particularly complex). JSDoc for public API.
*   **Small Functions**: Keep functions and methods small, focused, and doing one thing.
*   **No Magic Strings/Numbers**: Use constants or enums for literal values that appear multiple times or have special meaning.
*   **Error Handling**: Implement consistent error handling mechanisms across the application. Use HTTP interceptors for global error handling.
*   **Logging**: Use a dedicated logging service for application events and errors.
*   **Unit Testing**: Write comprehensive unit tests for components, services, pipes, and directives. Aim for high code coverage.
    *   Use TestBed for Angular-specific testing.
    *   Mock dependencies.
    *   Test asynchronous operations correctly.
*   **End-to-End Testing**: Implement E2E tests for critical user flows using tools like Cypress or Playwright.
*   **Linters & Formatters**: Use ESLint (with TSLint compatibility for Angular) and Prettier to enforce code style and catch potential issues automatically. Configure them to run pre-commit hooks.

---

## 10. Development Workflow & Tools

*   **Version Control**: Use Git for version control.
    *   Feature branches for new work.
    *   Clear commit messages (Conventional Commits recommended).
    *   Pull Request (PR) reviews.
*   **Angular CLI**: Leverage the Angular CLI for generating components, services, etc., to maintain consistency.
*   **IDE**: Use an IDE like VS Code with recommended extensions (e.g., Angular Language Service, Prettier, ESLint).
*   **Package Manager**: Use npm or Yarn.
*   **Continuous Integration/Continuous Deployment (CI/CD)**: Set up CI/CD pipelines to automate testing, linting, building, and deployment processes.

---

## 11. Functional Programming (FP)
1. Prefer **pure functions** for utilities, pipes, and data transformations.  
2. **Never mutate inputs** — use immutable patterns.  
3. Use **RxJS operators** (`map`, `filter`, `switchMap`, `mergeMap`, `tap`, `catchError`) for async/stream handling.  
4. Avoid subscribing inside components unless strictly necessary — prefer the `async` pipe.  

---

## 12. 


This style guide and technical specification provides a comprehensive framework for building high-quality Angular applications. Adhering to these guidelines will foster a collaborative development environment, resulting in robust, maintainable, performant, and accessible projects. 

















