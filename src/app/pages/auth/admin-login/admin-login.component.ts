import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLoginComponent {
  private fb = inject(FormBuilder);
  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  isLoading = false;
  errorMessage: string | null = null;

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    // Simulate login process
    setTimeout(() => {
      this.isLoading = false;
      if (this.loginForm.value.username !== 'admin' || this.loginForm.value.password !== 'password') {
        this.errorMessage = 'Invalid username or password';
      } else {
        console.log('Login successful');
      }
    }, 2000);
  }
}