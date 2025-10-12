import { Component, ChangeDetectionStrategy, ViewChildren, QueryList, ElementRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomerAuthService } from '../../../core/services/customer-auth.service';
import { CustomerAuthResponse } from '../../../core/models/auth.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerLoginComponent {
  private fb = inject(FormBuilder);
  private customerAuthService = inject(CustomerAuthService);
  @ViewChildren('pinInput') pinInputs!: QueryList<ElementRef>;

  pinForm: FormGroup = this.fb.group({
    pin: this.fb.array(new Array(16).fill('').map(() => this.fb.control('', [Validators.required, Validators.pattern(/^[0-9A-Za-z]$/)])))
  });

  isLoading = false;
  errorMessage: string | null = null;

  get pinControls(): FormControl[] {
    return (this.pinForm.get('pin') as FormArray).controls as FormControl[];
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length === 1 && /^[0-9A-Za-z]$/.test(value)) {
      if (index < 15) {
        this.pinInputs.get(index + 1)?.nativeElement.focus();
      }
    } else if (value.length > 1) {
      input.value = value[0];
    }
  }

  onBackspace(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if ((event as KeyboardEvent).key === 'Backspace' && !input.value && index > 0) {
      this.pinInputs.get(index - 1)?.nativeElement.focus();
    }
  }

  onSubmit(): void {
    const pin = this.pinForm.value.pin.join('');

    if (!/^[0-9]{16}$/.test(pin)) {
      this.errorMessage = 'Invalid PIN. Please enter a 16-digit numeric PIN.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.customerAuthService.login({ pin })
      .pipe(take(1))
      .subscribe({
        next: (response: CustomerAuthResponse) => {
          localStorage.setItem('accessToken', response.access);
          localStorage.setItem('expiresIn', response.expires_in.toString());
          this.isLoading = false;
          console.log('Login successful');
        },
        error: (err: unknown) => {
          this.isLoading = false;
          this.errorMessage = 'Login failed. Please try again.';
          console.error(err);
        }
      });
  }
}