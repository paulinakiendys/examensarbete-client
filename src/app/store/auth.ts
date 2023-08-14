import {
  createActionGroup,
  createFeature,
  createReducer,
  on,
  props,
  provideState,
} from '@ngrx/store';
import { Actions, createEffect, ofType, provideEffects } from '@ngrx/effects';
import { inject, makeEnvironmentProviders } from '@angular/core';
import { SignupService } from '../signup/signup.service';
import { catchError, exhaustMap, map, of } from 'rxjs';

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
    })
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
          catchError((error) =>
            of(AuthActions.signupFailure({ error }))
          )
        );
      })
    );
  },
  { functional: true }
);

export function provideAuthFeature() {
  return makeEnvironmentProviders([
    provideState(authFeature),
    provideEffects({ signup$ }),
    SignupService,
  ]);
}
