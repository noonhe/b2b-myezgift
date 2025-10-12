import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastOptions } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private snackBar = inject(MatSnackBar);

  showToast(options: ToastOptions): void {
    this.snackBar.open(options.data.message, options.action, {
      duration: options.data.duration || 3000,
      horizontalPosition: options.horizontalPosition || 'right',
      verticalPosition: options.verticalPosition || (options.data.position === 'top' ? 'top' : 'bottom'),
      panelClass: [`toast-${options.data.type || 'info'}`],
      ...options
    });
  }

  hideToast(): void {
    this.snackBar.dismiss();
  }
}