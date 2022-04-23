import { SubredditService } from './../../../service/subreddit.service';
import { PostService } from './../../../service/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  createPostForm: any = FormGroup;
  public postPayload: any = {
    postName: '',
    subredditName: '',
    url: '',
    description: ''
  };
  subReddits: any;

  public editId: number = 0


  constructor (
    private router: Router,
    private postService: PostService,
    private subredditService: SubredditService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.editId = this.activatedRoute.snapshot.params['id']

    if (this.editId) {
      this.postService.getPost(this.editId).subscribe((res) => {
        if (res.status) {
          this.createPostForm.patchValue({
            postName: res.data.postName,
            subredditName: res.data.subredditName,
            url: res.data.url,
            description: res.data.description
          })
        }
      })
    }

  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    this.getSubreddits();

  }
  getSubreddits() {
    this.subredditService.getAllSubreddits().subscribe((res) => {
      if (res.status) {
        this.subReddits = res.data;
      } else {
        this.subReddits = [];
      }
    });
  }
  createPost() {

    this.postPayload.postName = this.createPostForm.value.postName;
    this.postPayload.subredditName = this.createPostForm.value.subredditName;
    this.postPayload.url = this.createPostForm.value.url;
    this.postPayload.description = this.createPostForm.value.description;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }
  updatePost() {
    console.log(this.createPostForm.value);
    let params = {
      "postId": this.editId,
      "subredditName": this.createPostForm.value.subredditName,
      "postName": this.createPostForm.value.postName,
      "url": this.createPostForm.value.url,
      "description": this.createPostForm.value.description
    }

    this.postService.updatePost(params).subscribe((res: any) => {
      if (res.status) {
        this.router.navigateByUrl('/');
      }

    })

  }
}