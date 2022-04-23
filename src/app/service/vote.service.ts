import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

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

  vote(votePayload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}votes`, votePayload, this.header());
  }
}
