import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public apiUrl: string = environment.apiUrl;

  constructor (
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }
  header = () => {
    return {
      headers: {
        Authorization: "Bearer " + this.localStorage.retrieve('authenticationToken'),
      },
    };
  };

  postComment(commentPayload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}comments`, commentPayload, this.header());
  }
  getAllCommentsForPost(postId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}comments/by-post/${postId}`, this.header());
  }

  getAllCommentsByUser(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}comments/by-user/${username}`, this.header());
  }
}
