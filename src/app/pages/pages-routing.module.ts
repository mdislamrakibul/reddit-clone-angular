import { SubredditPostListComponent } from './subreddit/subreddit-post-list/subreddit-post-list.component';
import { UserProfileComponent } from './../auth/user-profile/user-profile.component';
import { PostViewComponent } from './post/post-view/post-view.component';
import { SubredditListComponent } from './subreddit/subreddit-list/subreddit-list.component';
import { SubredditCreateComponent } from './subreddit/subreddit-create/subreddit-create.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'post-create',
    component: PostCreateComponent,
    pathMatch: 'full'
  },
  {
    path: 'post-view/:id',
    component: PostViewComponent,
    pathMatch: 'full'
  },
  {
    path: 'post-update/:id',
    component: PostCreateComponent,
    pathMatch: 'full'
  },
  {
    path: 'subreddit-create',
    component: SubredditCreateComponent,
    pathMatch: 'full'
  },
  {
    path: 'subreddit-list',
    component: SubredditListComponent,
    pathMatch: 'full'
  },
  {
    path: 'subreddit-post-list/:id',
    component: SubredditPostListComponent,
    pathMatch: 'full'
  },
  {
    path: 'subreddit-update/:id',
    component: SubredditCreateComponent,
    pathMatch: 'full'
  },
  {
    path: 'user-profile/:username',
    component: UserProfileComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
