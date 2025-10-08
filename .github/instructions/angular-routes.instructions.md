---
applyTo: '**/.routes.ts'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

## Routing

* Define in `app.routes.ts`.
* Use `loadComponent` or `loadChildren` for lazy routes.
* Provide scoped services at route level if needed.
* Keep guards simple and delegate logic to services.


## Route Guards

* Implement `CanActivate`, `CanDeactivate`, etc., as needed.
* Use guards for authentication, authorization, and unsaved changes.
* Keep guards stateless; use services for complex logic.
* Provide guards in `core/` and import in routes.

## Redirection
* Use redirection for default paths and unauthorized access.
* Define redirection logic in guards or route definitions.
---