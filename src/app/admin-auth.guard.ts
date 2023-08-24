import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { selectToken, selectUser } from './store/auth';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

export const adminAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectToken).pipe(
    switchMap(token => {
      if (!token) {
        router.navigate(['/login']);
        return of(false);
      }

      return store.select(selectUser).pipe(
        map(user => {
          if (user && user.isAdmin) {
            return true; // User is an admin, allow access
          } else {
            router.navigate(['/login']); // Redirect to login page
            return false;
          }
        })
      );
    })
  );
};
