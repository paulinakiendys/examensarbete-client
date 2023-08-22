import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './auth.guard';

import { AddPostComponent } from './add-post/add-post.component';
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
import { UserPostsByDayMonthComponent } from './user-posts-by-day-month/user-posts-by-day-month.component';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';
import { UserPostEditComponent } from './user-post-edit/user-post-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/guest/public-posts/random', pathMatch: 'full' },

  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password/:resetToken', component: ResetPasswordComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'guest/public-posts/newest', component: NewestPublicPostsComponent },
  { path: 'guest/public-posts/oldest', component: OldestPublicPostsComponent },
  { path: 'guest/public-posts/random', component: RandomPublicPostsComponent },
  { path: 'guest/public-posts/search', component: SearchPublicPostsComponent },

  { path: 'guest/public-posts/:publicPostId', component: PublicPostComponent },

  {
    path: 'user/posts/add',
    component: AddPostComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user/posts/edit/:userPostId',
    component: UserPostEditComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user/posts/:month/:day',
    component: UserPostsByDayMonthComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user/posts/search',
    component: SearchUserPostsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user/posts/:userPostId',
    component: UserPostComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user/profile',
    component: UserProfileUpdateComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
