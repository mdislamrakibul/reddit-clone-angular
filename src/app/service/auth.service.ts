import { LocalStorageService } from 'ngx-webstorage';
import { LoginResponse } from './../payloads/AllPayloads';
import { LoginRequestPayload } from '../payloads/AllPayloads';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../payloads/AllPayloads';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl: string = environment.apiUrl;
  public refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor (
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/signup`, signupRequestPayload);
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/login`, loginRequestPayload);
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    }
    return this.http.post<LoginResponse>(`${this.apiUrl}auth/refresh/token`,
      refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getExpirationTime() {
    return this.localStorage.retrieve('expiresAt');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }


  logout() {
    this.http.post(`${this.apiUrl}auth/logout`, this.refreshTokenPayload)
      .subscribe(res => {
      })
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

  // logout() {
  //   this.localStorage.clear('authenticationToken');
  //   this.localStorage.clear('username');
  //   this.localStorage.clear('refreshToken');
  //   this.localStorage.clear('expiresAt');
  // }
}
