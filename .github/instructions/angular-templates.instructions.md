---
applyTo: '**.component.html, **.component.css, **.directive.ts'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

## 7. HTML & Accessibility

* Use semantic tags (`<header>`, `<main>`, `<footer>`, etc.).
* All `<img>` need `alt`.
* Forms must have associated `<label for>`.
* Support keyboard navigation and ARIA attributes.
* Use proper heading order (`h1` → `h6`).
* Show local time, hover for UTC (per PRD rule).
* Use Angular directives (`@if`, `@else`, `@for`, etc.) properly.
* Avoid inline styles and scripts.

---

## 8. CSS

* Component-scoped styles only.
* Use CSS + BEM convention:
* Use variables for colors, spacing, and typography.
* Prefer `rem` units.
* Avoid `!important`.
* Use Flexbox or CSS Grid for layout.
* Use Tailwind CSS utility classes where appropriate.
* Ensure styles are responsive (mobile-first).
* Avoid deep selectors (`::ng-deep`, `/deep/`).
* Use CSS custom properties for theming.
* Limit component styles to ~100 lines.
* Use media queries for responsiveness.
* Use CSS variables for consistent theming.
* Minimize global styles; prefer component styles.

