---
applyTo: '**/*.ts'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

## RxJS

* prefer signals for state management in services and components.
* prefer rxjs for handling async data streams, events, and complex data flows.
* Prefer `async` pipe over manual subscribe/unsubscribe.
* Always unsubscribe from long-lived observables.
* Common operators: `map`, `switchMap`, `takeUntil`, `catchError`, `shareReplay`.
* Use `take(1)` for single-shot observables.
* Use `combineLatest` to combine multiple observables.
* Use `forkJoin` for parallel HTTP requests.
* Use `debounceTime` for user input events.
* Use `distinctUntilChanged` to avoid duplicate emissions.
* Use `switchMap` to cancel previous requests on new emissions.
* Use `mergeMap` for concurrent requests.
* Use `exhaustMap` to ignore new emissions while processing.
* Use `concatMap` to queue requests in order.
* Use `filter` to exclude unwanted values.
* Use `takeUntil` to automatically complete observables.
* Handle errors with `catchError` and provide fallback values.
* Use `tap` for side effects (e.g., logging).
* Avoid nested subscriptions; use higher-order mapping operators.
* Use `shareReplay` to share a single subscription among multiple subscribers.
* Document complex observable chains with comments.
* Follow Angular Style Guide and project conventions.