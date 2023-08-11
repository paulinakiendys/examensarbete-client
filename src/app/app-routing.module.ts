import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicPostComponent } from './public-post/public-post.component';
import { RandomPublicPostsComponent } from './random-public-posts/random-public-posts.component';
import { SearchPublicPostsComponent } from './search-public-posts/search-public-posts.component';

const routes: Routes = [
  { path: '', redirectTo: '/guest/public-posts/random', pathMatch: 'full' },
  { path: 'guest/public-posts/random', component: RandomPublicPostsComponent },
  { path: 'guest/public-posts/search', component: SearchPublicPostsComponent },
  { path: 'guest/public-posts/:publicPostId', component: PublicPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
