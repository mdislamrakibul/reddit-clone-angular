import { VoteService } from './../../../service/vote.service';
import { ToastrService } from 'ngx-toastr';
import { PostService } from './../../../service/post.service';
import { AuthService } from './../../../service/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

enum VoteType {
  UPVOTE,
  DOWNVOTE
}

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: any;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  votePayload: any;
  upvoteColor: string = '';
  downvoteColor: string = '';

  constructor (
    private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService,
    private toastr: ToastrService
  ) {

    this.votePayload = {
      voteType: undefined,
      postId: undefined
    }
  }
  ngOnInit(): void {
    this.updateVoteDetails();

  }
  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
      // this.toastr.error(error.error.message);

    });
  }

  private updateVoteDetails() {

    this.postService.getPost(this.post?.id).subscribe((res: any) => {
      if (res.status) {
        this.post = res.data;
      } else {
        this.post = [];
      }
    });
  }
}
