import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

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

  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}posts`, this.header());
  }

  createPost(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}posts`, post, this.header());
  }

  updatePost(post: any): Observable<any> {
    return this.http.put(`${this.apiUrl}posts`, post, this.header());
  }

  getPost(postId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}posts/${postId}`, this.header());
  }

  getAllPostsByUser(username: string) {
    return this.http.get(`${this.apiUrl}posts/by-user/${username}`, this.header());
  }

  getAllPostsBySubredditId(id: number) {
    return this.http.get(`${this.apiUrl}posts/by-subreddit/${id}`, this.header());
  }
}
