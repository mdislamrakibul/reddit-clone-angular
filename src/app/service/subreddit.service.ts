import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

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

  getAllSubreddits(): Observable<any> {
    return this.http.get(`${this.apiUrl}subreddit`, this.header());
  }

  getSubredditById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}subreddit/${id}`, this.header());
  }

  createSubreddit(subreddit: any): Observable<any> {
    return this.http.post(`${this.apiUrl}subreddit`, subreddit, this.header());
  }

  updateSubreddit(subreddit: any): Observable<any> {
    return this.http.put(`${this.apiUrl}subreddit`, subreddit, this.header());
  }
}
