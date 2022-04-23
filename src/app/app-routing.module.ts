import { LoginComponent } from './auth/login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';
const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then(
        (m) => m.AuthModule
      ),
  },
  {
    path: "",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "**",
    redirectTo: "/auth/login",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
