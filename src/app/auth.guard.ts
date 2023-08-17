import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { selectToken } from './store/auth';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectToken).pipe(
    map(token => {
      if (token) {
        return true; // User has a token, allow access
      } else {
        router.navigate(['/login']); // Redirect to login page
        return false;
      }
    })
  );
};
