import { SignInComponent } from './sign-in/sign-in.component';
import { PostsComponent } from './modules/posts/posts.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DefaultComponent } from './layouts/default/default.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { UsersListComponent } from './modules/users-list/users-list.component';
import { CreateUserComponent } from './modules/create-user/create-user.component';
import { EditUserComponent } from './modules/edit-user/edit-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      { path: 'posts', component: PostsComponent },
      { path: 'users', component: UsersListComponent },

      { path: 'user/create', component: CreateUserComponent },
      { path: 'user/edit/:userId', component: EditUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
