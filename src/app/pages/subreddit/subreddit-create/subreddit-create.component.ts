import { SubredditService } from './../../../service/subreddit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subreddit-create',
  templateUrl: './subreddit-create.component.html',
  styleUrls: ['./subreddit-create.component.css']
})
export class SubredditCreateComponent implements OnInit {

  createSubredditForm: any = FormGroup
  subredditModel: any;
  title = new FormControl('');
  description = new FormControl('');
  public editId: number = 0

  constructor (
    private router: Router,
    private subredditService: SubredditService,
    private activeRouter: ActivatedRoute
  ) {
    this.createSubredditForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.subredditModel = {
      name: '',
      description: ''
    }
  }

  ngOnInit(): void {
    this.editId = this.activeRouter.snapshot.params['id']

    if (this.editId) {
      this.subredditService.getSubredditById(this.editId).subscribe((res: any) => {
        if (res.status) {
          this.createSubredditForm.patchValue({
            title: res.data.name,
            description: res.data.description
          })
        }
      })
    }
  }
  discard() {
    this.router.navigateByUrl('/');
  }

  createSubreddit() {
    this.subredditModel.name = this.createSubredditForm.get('title').value;
    this.subredditModel.description = this.createSubredditForm.get('description').value;
    this.subredditService.createSubreddit(this.subredditModel).subscribe((res: any) => {
      if (res.status) {
        this.router.navigateByUrl('/');
      }

    })
  }

  updateSubreddit() {
    let params = {
      id: +this.editId,
      name: this.createSubredditForm.value.title,
      description: this.createSubredditForm.value.description
    }
    this.subredditService.updateSubreddit(params).subscribe((res: any) => {
      if (res.status) {
        this.router.navigateByUrl('/subreddit-list');
      }
    })
  }
}
