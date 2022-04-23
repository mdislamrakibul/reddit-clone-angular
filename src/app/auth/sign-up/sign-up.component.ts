import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupRequestPayload } from 'src/app/payloads/AllPayloads';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isError: boolean = false;
  signupForm: any = FormGroup;
  signupRequestPayload: SignupRequestPayload;
  constructor (
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  signup() {
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;

    this.authService.signup(this.signupRequestPayload).subscribe((res) => {
      if (res.status) {
        this.isError = false;
        this.router.navigate(['/login'], { queryParams: { registered: true, orderby: "price" } });
        return
      } else {
        this.isError = true;
        this.toastr.error(res?.message || 'Registration Failed! Please try again');
        return
      }
    });
  }
}
