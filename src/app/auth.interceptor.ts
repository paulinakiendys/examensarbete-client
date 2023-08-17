import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectToken } from './store/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private store = inject(Store);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store.select(selectToken).pipe(
      take(1),
      switchMap((token) => {
        if (token) {
          // Clone the request and add an Authorization header with the token
          const authReq = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
          return next.handle(authReq);
        }
        return next.handle(request);
      })
    );
  }
}
