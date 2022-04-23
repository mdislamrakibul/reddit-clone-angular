import { RouterModule } from '@angular/router';
import { VoteButtonComponent } from './vote-button/vote-button.component';
import { SubredditSideBarComponent } from './subreddit-side-bar/subreddit-side-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { PostTitleComponent } from './post-title/post-title.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
    exports: [
        PostTitleComponent,
        SideBarComponent,
        SubredditSideBarComponent,
        VoteButtonComponent
    ],
    declarations: [
        PostTitleComponent,
        SideBarComponent,
        SubredditSideBarComponent,
        VoteButtonComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule
    ]
})
export class SharedModule { }
