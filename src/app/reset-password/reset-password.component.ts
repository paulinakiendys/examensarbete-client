import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordService } from './reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  newPassword: string = '';
  resetToken: string | null = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit() {
    this.resetToken = this.route.snapshot.paramMap.get('resetToken');
  }

  submit() {
    if (this.newPassword) {
      this.resetPasswordService
        .resetPassword(this.resetToken, this.newPassword)
        .subscribe(
          (response) => {
            this.errorMessage = '';
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
