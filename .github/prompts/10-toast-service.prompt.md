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


**Implement Global Error Handling**
Requirements:
1. Create a new service named `ErrorHandlerInterceptor` in the `src/app/core/interceptors` directory.
2. Implement a method to handle errors globally.
3. Use the `ToastService` to display error messages when an error occurs.

files:
- `src/app/core/services/toast.service.ts`
- `src/app/core/services/error-handler.interceptor.ts`

```typescript
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastOptions } from '../models/toast.model';
import { ErrorHandler } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showToast(options: ToastOptions) {
    this.snackBar.open(options.data.message, options.action, {
      duration: options.data.duration || 3000,
      horizontalPosition: options.horizontalPosition || 'right',
      verticalPosition: options.verticalPosition || (options.data.position === 'top' ? 'top' : 'bottom'),
      panelClass: [`toast-${options.data.type || 'info'}`],
      ...options
    });
  }

  hideToast() {
    this.snackBar.dismiss();
  }
}

```

```typescript
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        this.toastService.showToast({
          data: {
            message: 'An unexpected error occurred. Please try again later.',
            type: 'error',
            position: 'bottom',
            duration: 5000
          }
        });
        throw error;
      })
    );
  }
}
```

provide the `ErrorHandlerInterceptor` in `src/app/app.config.ts`:

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './core/services/error-handler.interceptor';
...
export const appConfig: ApplicationConfig = {
  providers: [
    ...
    provideHttpClient(
    withInterceptors([ErrorHandlerInterceptor]),
  )
    ...
  ]
};
```
  