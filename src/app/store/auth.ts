import { inject, makeEnvironmentProviders } from '@angular/core';

import {
  createActionGroup,
  createFeature,
  createReducer,
  emptyProps,
  on,
  props,
  provideState,
} from '@ngrx/store';
import { Actions, createEffect, ofType, provideEffects } from '@ngrx/effects';

import { catchError, exhaustMap, map, of } from 'rxjs';

import { LoginService } from '../login/login.service';
import { SignupService } from '../signup/signup.service';

export interface AuthState {
  user: any | null;
  token: string | null;
  error: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
  loading: false,
};

// Actions
export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Signup: props<{ email: string; password: string }>(),
    'Signup Success': props<{ user: any; token: string }>(),
    'Signup Failure': props<{ error: string }>(),
    Login: props<{ email: string; password: string }>(),
    'Login Success': props<{ user: any; token: string }>(),
    'Login Failure': props<{ error: string }>(),
    Logout: emptyProps(),
  },
});

// Reducers
export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.signup, (state) => {
      return {
        ...state,
        loading: true,
      };
    }),
    on(AuthActions.signupSuccess, (state, { user, token }) => {
      return {
        ...state,
        user,
        token,
        error: null,
        loading: false,
      };
    }),
    on(AuthActions.signupFailure, (state, { error }) => {
      return {
        ...state,
        user: null,
        token: null,
        error,
        loading: false,
      };
    }),
    on(AuthActions.login, (state) => {
      return {
        ...state,
        loading: true,
      };
    }),
    on(AuthActions.loginSuccess, (state, { user, token }) => {
      return {
        ...state,
        user,
        token,
        error: null,
        loading: false,
      };
    }),
    on(AuthActions.loginFailure, (state, { error }) => {
      return {
        ...state,
        user: null,
        token: null,
        error,
        loading: false,
      };
    }),
    on(AuthActions.logout, () => initialState)
  ),
});

// Selectors
export const {
  selectAuthState,
  selectUser,
  selectToken,
  selectLoading,
  selectError,
} = authFeature;

// Effects
export const signup$ = createEffect(
  (actions$ = inject(Actions)) => {
    const signupService = inject(SignupService);

    return actions$.pipe(
      ofType(AuthActions.signup),
      exhaustMap((action) => {
        return signupService.signup(action.email, action.password).pipe(
          map((response) =>
            AuthActions.signupSuccess({
              user: response.user,
              token: response.token,
            })
          ),
          catchError((error) => of(AuthActions.signupFailure({ error })))
        );
      })
    );
  },
  { functional: true }
);

export const login$ = createEffect(
  (actions$ = inject(Actions)) => {
    const loginService = inject(LoginService);

    return actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) => {
        return loginService.login(action.email, action.password).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              user: response.user,
              token: response.token,
            })
          ),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        );
      })
    );
  },
  { functional: true }
);

export function provideAuthFeature() {
  return makeEnvironmentProviders([
    provideState(authFeature),
    provideEffects({ login$, signup$ }),
    LoginService,
    SignupService,
  ]);
}
