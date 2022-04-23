import { LocalStorageService } from 'ngx-webstorage';
import { SubredditService } from './../../../service/subreddit.service';
import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-subreddit-list',
  templateUrl: './subreddit-list.component.html',
  styleUrls: ['./subreddit-list.component.css']
})
export class SubredditListComponent implements OnInit {

  subReddits: any;
  public user: string = '';
  faEdit = faEdit;


  constructor (
    private subredditService: SubredditService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getAllSubreddits()
    this.user = this.localStorage.retrieve('username');
  }
  getAllSubreddits() {
    this.subredditService.getAllSubreddits().subscribe(res => {
      if (res.status) {
        this.subReddits = res.data;
      } else {
        this.subReddits = [];
      }
    })
  }

}
