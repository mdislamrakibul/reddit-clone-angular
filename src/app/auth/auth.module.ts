import { PagesModule } from './../pages/pages.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  exports: [
    SignUpComponent,
    LoginComponent,
    UserProfileComponent
  ],
  declarations: [
    SignUpComponent,
    LoginComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    PagesModule
  ]
})
export class AuthModule { }
