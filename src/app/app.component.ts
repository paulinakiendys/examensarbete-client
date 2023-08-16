import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions, selectUser } from './store/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private store = inject(Store);
  readonly user$ = this.store.select(selectUser);

  logout() {
    this.store.dispatch(AuthActions.logout());

  }
}
