import { MatSnackBarConfig } from '@angular/material/snack-bar';

export interface ToastOptions extends MatSnackBarConfig {
  action?: string; // Optional action button text
  data: {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    position?: 'top' | 'bottom';
    duration?: number;
  };
}