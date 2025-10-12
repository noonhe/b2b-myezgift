---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.

**Create design tokens for this projects**

Requirements:
- use CSS custom properties to define design tokens for colors, typography, spacing, borders, and shadows.
- Create separate CSS files for each category of design tokens:
- Define a set of color tokens (e.g., primary, secondary, background, text) with specific HEX or RGB values.
- Define typography tokens (e.g., font sizes, font weights, line heights) for headings, body text, and other text elements.
- Define spacing tokens (e.g., margin, padding) for consistent layout and spacing throughout the application.
- Define border radius tokens for rounded corners on UI elements.
- Define shadow tokens for consistent use of shadows across components.
- import all these styles to `src/styles.css` so they are globally available.

files:
```
src/styles/_colors.css
src/styles/_typography.css
src/styles/_spacing.css
src/styles/_borders.css
src/styles/_shadows.css
```

modify existing template and style files to use these design tokens instead of hardcoded values:
- `src/app/pages/auth/customer-login/customer-login.component.css`
- `src/app/pages/auth/customer-login/customer-login.component.html`
- `src/app/pages/auth/admin-login/admin-login.component.css`
- `src/app/pages/auth/admin-login/admin-login.component.html`
- `src/app/pages/auth/home/home.component.html`
- `src/app/pages/auth/home/home.component.css`



Success Criteria:
- A comprehensive set of design tokens is created and documented.

