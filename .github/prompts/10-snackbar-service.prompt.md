---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.

**Implement Toast Service in Angular**

Requirements:
1. Create a new service named `ToastService` in the `src/app/core/services` directory.
2. Implement methods for showing and hiding the toast.
3. Use Angular Material's Snackbar component for the UI.
4. Ensure the toast can display different messages and types (e.g., success, error).
5. Provide a way to customize the duration and action buttons of the toast.
6. create a model for toast options in `src/app/core/models/toast.model.ts`:
```typescript
import { MatSnackBarConfig } from '@angular/material/snack-bar';

export interface ToastOptions extends MatSnackBarConfig {
  data: {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    position?: 'top' | 'bottom';
    duration?: number;
  };
}
```