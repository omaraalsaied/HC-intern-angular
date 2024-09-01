import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PostComponent} from "./components/post/post.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {authenticateGuard} from "./guards/authentication/authenticate.guard";
import {LoginComponent} from "./components/login/login.component";
import {UnauthorizedComponent} from "./components/unauthorized/unauthorized.component";
import {adminAuthGuard} from "./guards/authorization/admin-auth.guard";
import {RegisterComponent} from "./components/register/register.component";

export const routes: Routes = [

  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent,
    title: "home",
    canActivate: [authenticateGuard]
  },
  {
    path: "post/:id",
    component: PostComponent,
    title: "Post",
    canActivate: [authenticateGuard]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    title: "Admin Dashboard",
    canActivate: [authenticateGuard, adminAuthGuard]
  },
  {
    path: "login",
    component: LoginComponent,
    title: "Login"

  },
  {
    path: "register",
    component: RegisterComponent,
    title: "create a new account"
  },
  {
    path: "unauthorized",
    component: UnauthorizedComponent,
    title: "unauthorized",
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "Not Found"
  }

];
