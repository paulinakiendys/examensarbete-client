import { Component } from '@angular/core';
import { ForgotPasswordService } from './forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private forgotPasswordService: ForgotPasswordService) {}

  submit() {
    if (this.email) {
      this.forgotPasswordService.forgotPassword(this.email).subscribe(
        (response) => {
          this.errorMessage = ''
          this.successMessage = response.message;
        },
        (err) => {
          this.successMessage = '';
          this.errorMessage = err.error.message;
        }
      );
    }
  }
}
