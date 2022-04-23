import { SubredditService } from './../../../service/subreddit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  public subReddits: any
  public displayViewAll: boolean = false;

  constructor (
    private subredditService: SubredditService
  ) { }

  ngOnInit(): void {
    this.getAllSubreddit()
  }

  getAllSubreddit() {
    this.subredditService.getAllSubreddits().subscribe(res => {

      if (res.status) {

        if (res.data.length >= 4) {
          this.subReddits = res.data.splice(0, 3);
          this.displayViewAll = true;
        } else {
          this.subReddits = res.data;
        }
      } else {
        this.subReddits = [];

      }
    });
  }

}
