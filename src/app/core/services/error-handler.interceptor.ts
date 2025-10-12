import { inject } from '@angular/core';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';


export function errorHandlerInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    const toast = inject(ToastService);
    return next(req).pipe(
      catchError((error: unknown) => {
        console.error('An error occurred:', error);
        toast.showToast({
          data: {
            message: 'An unexpected error occurred. Please try again later.',
            type: 'error',
            position: 'bottom',
            duration: 5000
          }
        });
        return throwError(() => error);
      })
    );
  }