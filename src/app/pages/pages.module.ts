import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { SubredditCreateComponent } from './subreddit/subreddit-create/subreddit-create.component';
import { SubredditListComponent } from './subreddit/subreddit-list/subreddit-list.component';

import { EditorModule } from '@tinymce/tinymce-angular';
import { PostViewComponent } from './post/post-view/post-view.component';
import { SubredditPostListComponent } from './subreddit/subreddit-post-list/subreddit-post-list.component';

@NgModule({
  exports: [
    HomeComponent,
    SharedModule,
    PostCreateComponent,
    SubredditCreateComponent,
    SubredditListComponent,
    PostViewComponent,
    SubredditPostListComponent,
  ],
  declarations: [
    HomeComponent,
    PostCreateComponent,
    SubredditCreateComponent,
    SubredditListComponent,
    PostViewComponent,
    SubredditPostListComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatIconModule,
    FontAwesomeModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule
  ]
})
export class PagesModule { }
