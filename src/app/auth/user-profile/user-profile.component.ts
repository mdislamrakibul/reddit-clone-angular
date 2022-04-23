import { CommentService } from './../../service/comment.service';
import { PostService } from './../../service/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name: string;
  posts: any;
  comments: any;
  postLength: number = 0;
  commentLength: number = 0;

  constructor (
    private activatedRoute: ActivatedRoute, private postService: PostService,
    private commentService: CommentService
  ) {

    this.name = this.activatedRoute.snapshot.params['username'];

    this.postService.getAllPostsByUser(this.name).subscribe((res: any) => {
      if (res.status) {
        this.posts = res.data;
        this.postLength = this.posts.length;
      } else {
        this.posts = [];
        this.postLength = 0;
      }

    });
    this.commentService.getAllCommentsByUser(this.name).subscribe((res: any) => {
      if (res.status) {
        this.comments = res.data;
        this.commentLength = this.comments.length;
      } else {
        this.comments = [];
        this.commentLength = 0;
      }
    });


  }

  ngOnInit(): void {
  }

}
