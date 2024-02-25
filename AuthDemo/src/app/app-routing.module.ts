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
import { ListDashboardComponent } from './modules/components/list-dashboard/list-dashboard.component';
import { CreateDashComponent } from './modules/components/create-dash/create-dash.component';
import { EditDashComponent } from './modules/components/edit-dash/edit-dash.component';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      { path: 'posts', component: PostsComponent },
      { path: 'users', component: UsersListComponent },

      { path: 'user/create', component: CreateUserComponent },
      { path: 'user/edit/:userId', component: EditUserComponent },

      { path: 'dashboards', component: ListDashboardComponent },
      { path: 'dashboard/create', component: CreateDashComponent },
      { path: 'dashboards/edit/:dashId', component: EditDashComponent },
      { path: 'dashboards/view/:dashId', component: DashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
