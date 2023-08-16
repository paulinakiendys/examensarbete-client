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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private store = inject(Store);
  readonly user$ = this.store.select(selectUser);
  readonly error$ = this.store.select(selectError);
  readonly loading$ = this.store.select(selectLoading);

  email: string = '';
  password: string = '';

  submit(loginForm: NgForm) {
    if (loginForm.valid) {
      this.store.dispatch(
        AuthActions.login({ email: this.email, password: this.password })
      );
    }
  }
}
