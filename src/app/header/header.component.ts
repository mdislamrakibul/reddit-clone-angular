import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faUser = faUser;
  isLoggedIn: boolean = false;
  username: string = '';

  constructor (
    private authService: AuthService, private router: Router
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }

  ngOnInit(): void {

  }
  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  // logout() {
  //   this.authService.logout();
  //   this.router.navigateByUrl('/login');
  // }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('').then(() => {
      window.location.reload();
    })
  }
}
