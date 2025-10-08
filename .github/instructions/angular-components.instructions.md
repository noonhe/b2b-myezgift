---
applyTo: '**/.component.ts, **/.component.html, **/.component.css, **/.directive.ts'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

##  Components and Directives

* `standalone: true` always.
* Import all dependencies explicitly.
* Use **OnPush** change detection by default.
* **Smart (container)** vs **Dumb (presentational)** pattern:

  * Smart → handles data + service calls.
  * Dumb → receives `@Input()`, emits `@Output()`, no services.
* Limit components to ~300 lines.
* Always clean up subscriptions (`takeUntil`, `destroyRef`, or `async` pipe).
* Use `@ViewChild`/`@ContentChild` with `{ static: false }` unless needed at initialization.
* Use `@HostListener` for DOM events on the host element.
* Use `@HostBinding` to bind host element properties.

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