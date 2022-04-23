import { LoginRequestPayload } from './../../payloads/AllPayloads';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any = FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isError: boolean = false;
  public registerSuccessMessage: string = ''
  constructor (
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
      .subscribe(params => {

        if (params?.['registered'] && params?.['registered'] !== undefined && params?.['registered'] === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });
  }

  login() {
    this.isError = false;
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe((res) => {
      if (res.status) {
        this.isError = false;
        this.localStorage.store('authenticationToken', res?.data?.authenticationToken);
        this.localStorage.store('username', res?.data?.username);
        this.localStorage.store('refreshToken', res?.data?.refreshToken);
        this.localStorage.store('expiresAt', res?.data?.expireAt);
        this.router.navigateByUrl('/');
        this.toastr.success(res?.message || 'Login Successful');
        this.registerSuccessMessage = 'Please Check your inbox for activation email '
          + 'activate your account before you Login!';
        return
      } else {
        this.isError = true;
        this.toastr.error(res?.message || 'Login Failed! Please try again');
        return
      }
    });
  }
}