import { UsersFormComponent } from './../../modules/users-form/users-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './../../modules/edit-user/edit-user.component';
import { CreateUserComponent } from './../../modules/create-user/create-user.component';
import { UsersListComponent } from './../../modules/users-list/users-list.component';
import { MaterialModule } from './../../material/material.module';
import { SharedModule } from './../../shared/shared.module';
import { PostsComponent } from './../../modules/posts/posts.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { GridsterModule } from 'angular-gridster2';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    UsersFormComponent,
    UsersListComponent,
    CreateUserComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    GridsterModule,
  ],
})
export class DefaultModule {}
