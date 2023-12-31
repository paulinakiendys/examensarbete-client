import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { authFeature, login$, signup$, updateProfile$ } from './store/auth';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AuthInterceptor } from './auth.interceptor';

import { AddPostComponent } from './add-post/add-post.component';
import { AdminPostComponent } from './admin-post/admin-post.component';
import { AdminPostsComponent } from './admin-posts/admin-posts.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { NewestPublicPostsComponent } from './newest-public-posts/newest-public-posts.component';
import { OldestPublicPostsComponent } from './oldest-public-posts/oldest-public-posts.component';
import { PublicPostComponent } from './public-post/public-post.component';
import { RandomPublicPostsComponent } from './random-public-posts/random-public-posts.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SearchPublicPostsComponent } from './search-public-posts/search-public-posts.component';
import { SearchUserPostsComponent } from './search-user-posts/search-user-posts.component';
import { SignupComponent } from './signup/signup.component';
import { UserPostComponent } from './user-post/user-post.component';
import { UserPostEditComponent } from './user-post-edit/user-post-edit.component';
import { UserPostsByDayMonthComponent } from './user-posts-by-day-month/user-posts-by-day-month.component';
import { UserPostsInRangeComponent } from './user-posts-in-range/user-posts-in-range.component';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    AddPostComponent,
    AdminPostComponent,
    AdminPostsComponent,
    ForgotPasswordComponent,
    LoginComponent,
    NewestPublicPostsComponent,
    OldestPublicPostsComponent,
    PublicPostComponent,
    RandomPublicPostsComponent,
    ResetPasswordComponent,
    SearchPublicPostsComponent,
    SearchUserPostsComponent,
    SignupComponent,
    UserPostComponent,
    UserPostEditComponent,
    UserPostsByDayMonthComponent,
    UserPostsInRangeComponent,
    UserProfileUpdateComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule,
  ],
  providers: [
    provideStore(),
    provideState(authFeature),
    provideStoreDevtools(),
    provideEffects(
      { authFeature: signup$ },
      { authFeature: login$ },
      { authFeature: updateProfile$ }
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
