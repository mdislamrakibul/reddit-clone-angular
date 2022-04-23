import { SubredditService } from './../../../service/subreddit.service';
import { PostService } from './../../../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subreddit-post-list',
  templateUrl: './subreddit-post-list.component.html',
  styleUrls: ['./subreddit-post-list.component.css']
})
export class SubredditPostListComponent implements OnInit {

  public posts: any;
  public subreddit: any
  public id: number = 0;
  constructor (
    private activatedRoute: ActivatedRoute, private postService: PostService, private subredditService: SubredditService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];

  }

  ngOnInit(): void {
    this.getAllPostBySubreddit()
    this.getSubredditDataById()
  }

  getSubredditDataById() {
    this.subredditService.getSubredditById(this.id).subscribe((res: any) => {
      if (res.status) {
        this.subreddit = res.data
      }
    })
  }

  getAllPostBySubreddit() {
    this.postService.getAllPostsBySubredditId(this.id).subscribe((res: any) => {
      if (res.status) {
        this.posts = res.data;
      } else {
        this.posts = [];
      }
    })
  }
}
