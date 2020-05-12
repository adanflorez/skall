import { UserComponent } from "./layout/user/user.component";
import { RegisterComponent } from './pages/authentication/register/register.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
      },
      {
        path: 'profile',
        loadChildren: './pages/profile/profile.module#ProfileModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
