import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  AuthActions,
  selectError,
  selectLoading,
  selectUser,
} from '../store/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  private store = inject(Store);
  readonly user$ = this.store.select(selectUser);
  readonly error$ = this.store.select(selectError);
  readonly loading$ = this.store.select(selectLoading);

  email: string = '';
  password: string = '';

  submit(signupForm: NgForm) {
    if (signupForm.valid) {
      this.store.dispatch(
        AuthActions.signup({ email: this.email, password: this.password })
      );
    }
  }
}
