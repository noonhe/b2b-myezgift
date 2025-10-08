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

## 3. Components

* `standalone: true` always.
* Import all dependencies explicitly.
* Use **OnPush** change detection by default.
* **Smart (container)** vs **Dumb (presentational)** pattern:

  * Smart → handles data + service calls.
  * Dumb → receives `@Input()`, emits `@Output()`, no services.
* Limit components to ~300 lines.
* Always clean up subscriptions (`takeUntil`, `destroyRef`, or `async` pipe).

Example:

```ts
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

---

## 4. Services & State

* Each service = **one responsibility**.
* `@Injectable({ providedIn: 'root' })` unless scoped.
* Use RxJS `BehaviorSubject` or `ReplaySubject` for state.
* Expose `Observable` (never mutable subject).
* No HttpClient calls inside components.

---

## 5. Routing

* Define in `app.routes.ts`.
* Use `loadComponent` or `loadChildren` for lazy routes.
* Provide scoped services at route level if needed.
* Keep guards simple and delegate logic to services.

---

## 6. RxJS

* Prefer `async` pipe over manual subscribe/unsubscribe.
* Always unsubscribe from long-lived observables.
* Common operators: `map`, `switchMap`, `takeUntil`, `catchError`, `shareReplay`.
* Use `take(1)` for single-shot observables.

---

## 7. HTML & Accessibility

* Use semantic tags (`<header>`, `<main>`, `<footer>`, etc.).
* All `<img>` need `alt`.
* Forms must have associated `<label for>`.
* Support keyboard navigation and ARIA attributes.
* Use proper heading order (`h1` → `h6`).
* Show local time, hover for UTC (per PRD rule).

---

## 8. CSS

* Component-scoped styles only.
* Use CSS + BEM convention:
* Use variables for colors, spacing, and typography.
* Prefer `rem` units.
* Avoid `!important`.

---

## 9. Performance

* Use **lazy loading**.
* Optimize change detection (`OnPush`).
* Debounce user inputs.
* Compress and lazy-load images.
* Use virtual scrolling for long lists.
* Cache observables via `shareReplay(1)`.

---

## 10. Clean Code

* No magic strings/numbers — use constants or enums.
* Meaningful variable and function names.
* Keep functions small and focused.
* Comment *why*, not *what*.
* Use ESLint + Prettier.
* Commit with [Conventional Commits](https://www.conventionalcommits.org/).

---

## 11. Testing

* Unit test all components, pipes, and services.
* Use TestBed for Angular testing.
* Mock dependencies; test async properly.
* E2E with Cypress or Playwright for main flows.

---

## 12. Functional & Reactive Programming

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

