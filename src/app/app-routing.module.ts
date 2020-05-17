import { UserComponent } from "./layout/user/user.component";
import { RegisterComponent } from './pages/authentication/register/register.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: '', redirectTo: 'index', pathMatch: 'full'
  },
  {
    path: 'index',
    loadChildren: './pages/index/index.module#IndexModule',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'feed',
        loadChildren: './pages/feed/feed.module#FeedModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: './pages/profile/profile.module#ProfileModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'search',
        loadChildren: './pages/search/search.module#SearchModule',
        // canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
