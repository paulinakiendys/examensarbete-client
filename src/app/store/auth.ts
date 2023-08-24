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
import { UserProfileUpdateService } from '../user-profile-update/user-profile-update.service';
import { Router } from '@angular/router';

export interface AuthState {
  user: any | null;
  token: string | null;
  error: string | null;
  loading: boolean;
  message: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
  loading: false,
  message: null,
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
    'Update Profile': props<{ formData: FormData }>(),
    'Update Profile Success': props<{ user: any; message: string }>(),
    'Update Profile Failure': props<{ error: string }>(),
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
        message: null,
      };
    }),
    on(AuthActions.signupFailure, (state, { error }) => {
      return {
        ...state,
        user: null,
        token: null,
        error,
        loading: false,
        message: null,
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
        message: null,
      };
    }),
    on(AuthActions.loginFailure, (state, { error }) => {
      return {
        ...state,
        user: null,
        token: null,
        error,
        loading: false,
        message: null,
      };
    }),
    on(AuthActions.logout, () => initialState),
    on(AuthActions.updateProfile, (state) => {
      return {
        ...state,
        loading: true,
      };
    }),
    on(AuthActions.updateProfileSuccess, (state, { user, message }) => {
      return {
        ...state,
        user,
        message,
        error: null,
        loading: false,
      };
    }),
    on(AuthActions.updateProfileFailure, (state, { error }) => {
      return {
        ...state,
        user: null,
        token: null,
        error,
        loading: false,
        message: null,
      };
    })
  ),
});

// Selectors
export const {
  selectAuthState,
  selectError,
  selectLoading,
  selectMessage,
  selectToken,
  selectUser,
} = authFeature;

// Effects
export const signup$ = createEffect(
  (actions$ = inject(Actions)) => {
    const signupService = inject(SignupService);
    const router = inject(Router);

    return actions$.pipe(
      ofType(AuthActions.signup),
      exhaustMap((action) => {
        return signupService.signup(action.email, action.password).pipe(
          map((response) => {
            router.navigate(['/user/posts/add']); // Redirect user after signup
            return AuthActions.signupSuccess({
              user: response.user,
              token: response.token,
            });
          }),
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
    const router = inject(Router);

    return actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) => {
        return loginService.login(action.email, action.password).pipe(
          map((response) => {
            const user = response.user;
            if (user.isAdmin) {
              router.navigate(['/admin/posts']); // Redirect admin
            } else {
              router.navigate(['/user/posts/add']); // Redirect user
            }
            return AuthActions.loginSuccess({
              user: response.user,
              token: response.token,
            });
          }),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        );
      })
    );
  },
  { functional: true }
);

export const updateProfile$ = createEffect(
  (actions$ = inject(Actions)) => {
    const userProfileUpdateService = inject(UserProfileUpdateService);

    return actions$.pipe(
      ofType(AuthActions.updateProfile),
      exhaustMap((action) => {
        return userProfileUpdateService.userProfileUpdate(action.formData).pipe(
          map((response) =>
            AuthActions.updateProfileSuccess({
              user: response.user,
              message: response.message,
            })
          ),
          catchError((error) => of(AuthActions.updateProfileFailure({ error })))
        );
      })
    );
  },
  { functional: true }
);

export function provideAuthFeature() {
  return makeEnvironmentProviders([
    provideState(authFeature),
    provideEffects({ login$, signup$, updateProfile$ }),
    LoginService,
    SignupService,
    UserProfileUpdateService,
  ]);
}
