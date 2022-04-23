import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { faComments, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.css']
})
export class PostTitleComponent implements OnInit {

  @Input() data: any;
  faComments = faComments;
  faEdit = faEdit;
  public user: string = '';

  constructor (
    private router: Router,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.user = this.localStorage.retrieve('username');
  }


  goToPost(postId: number) {
    this.router.navigateByUrl('/post-view/' + postId);
  }

  editPost(postId: number) {
    console.log("🚀 ~ file: post-title.component.ts ~ line 35 ~ PostTitleComponent ~ editPost ~ postId", postId);
    // this.router.navigateByUrl('/post-update/' + postId);
    // this.router.navigate(['/post-create/'], { queryParams: { postId: +postId } })
    this.router.navigate(['/post-update/'], { queryParams: { postId: +postId } })
  }
}
