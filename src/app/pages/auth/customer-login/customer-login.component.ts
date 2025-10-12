import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerLoginComponent {}