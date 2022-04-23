import { AuthService } from './../../../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentService } from './../../../service/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './../../../service/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  public postId: any = '';
  post: any;
  commentForm: any = FormGroup;
  commentPayload: any;
  comments: any;

  constructor (
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private router: Router,
    private authService: AuthService
  ) {

    this.postId = +this.activateRoute.snapshot.params['id'];

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      postId: +this.postId,
      text: '',
      userName: this.authService.getUserName()
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(res => {
      if (res.status) {
        this.post = res.data;
      } else {
        this.post = [];
      }
    });
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentService.postComment(this.commentPayload).subscribe((res: any) => {
      if (res.status) {
        this.commentForm.get('text').setValue('');
        this.getCommentsForPost();
      }

    })
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe((res: any) => {

      if (res.status) {
        this.comments = res.data;
      } else {
        this.comments = [];
      }
    });
  }

}
