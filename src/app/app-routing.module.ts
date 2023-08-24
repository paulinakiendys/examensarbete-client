import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { adminAuthGuard } from './admin-auth.guard';
import { userAuthGuard } from './user-auth.guard';

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

const routes: Routes = [
  { path: '', redirectTo: '/guest/public-posts/random', pathMatch: 'full' },

  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password/:resetToken', component: ResetPasswordComponent },
  { path: 'signup', component: SignupComponent },

  // Guest routes
  { path: 'guest/public-posts/newest', component: NewestPublicPostsComponent },
  { path: 'guest/public-posts/oldest', component: OldestPublicPostsComponent },
  { path: 'guest/public-posts/random', component: RandomPublicPostsComponent },
  { path: 'guest/public-posts/search', component: SearchPublicPostsComponent },
  { path: 'guest/public-posts/:publicPostId', component: PublicPostComponent },

  // User routes
  {
    path: 'user/posts/add',
    component: AddPostComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'user/posts/edit/:userPostId',
    component: UserPostEditComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'user/posts/:month/:day',
    component: UserPostsByDayMonthComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'user/posts/range',
    component: UserPostsInRangeComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'user/posts/search',
    component: SearchUserPostsComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'user/posts/:userPostId',
    component: UserPostComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'user/profile',
    component: UserProfileUpdateComponent,
    canActivate: [userAuthGuard],
  },

  // Admin routes
  {
    path: 'admin/posts',
    component: AdminPostsComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'admin/posts/:pendingPostId',
    component: AdminPostComponent,
    canActivate: [adminAuthGuard],
  },

  // Catch-all route
  { path: '**', redirectTo: '/guest/public-posts/random' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
