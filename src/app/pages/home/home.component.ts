import { PostService } from './../../service/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public posts: any = []

  constructor (
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getPosts()
  }

  getPosts() {
    this.postService.getPosts().subscribe(res => {
      if (res.status) {
        this.posts = res.data
      }
    });
  }

  upvotePost() { }
  downvotePost() { }
  goToPost(postId: number) { }
}
