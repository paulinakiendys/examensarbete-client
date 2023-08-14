import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewestPublicPostsComponent } from './newest-public-posts/newest-public-posts.component';
import { OldestPublicPostsComponent } from './oldest-public-posts/oldest-public-posts.component';
import { PublicPostComponent } from './public-post/public-post.component';
import { RandomPublicPostsComponent } from './random-public-posts/random-public-posts.component';
import { SearchPublicPostsComponent } from './search-public-posts/search-public-posts.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/guest/public-posts/random', pathMatch: 'full' },

  { path: 'signup', component: SignupComponent },

  { path: 'guest/public-posts/newest', component: NewestPublicPostsComponent },
  { path: 'guest/public-posts/oldest', component: OldestPublicPostsComponent },
  { path: 'guest/public-posts/random', component: RandomPublicPostsComponent },
  { path: 'guest/public-posts/search', component: SearchPublicPostsComponent },

  { path: 'guest/public-posts/:publicPostId', component: PublicPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
