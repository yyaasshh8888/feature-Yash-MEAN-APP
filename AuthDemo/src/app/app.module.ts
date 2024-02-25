import { HttpClientModule } from '@angular/common/http';
import { DefaultModule } from './layouts/default/default.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { LoadingInterceptor } from './auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SignInComponent } from './sign-in/sign-in.component';
import { ListDashboardComponent } from './modules/components/list-dashboard/list-dashboard.component';
import { CreateDashComponent } from './modules/components/create-dash/create-dash.component';
import { EditDashComponent } from './modules/components/edit-dash/edit-dash.component';
import { FormDashComponent } from './modules/components/form-dash/form-dash.component';
import { HomeComponent } from './modules/home/home.component';

@NgModule({
  declarations: [AppComponent, SignInComponent, ListDashboardComponent, CreateDashComponent, EditDashComponent, FormDashComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    DefaultModule,
  ],
  providers: [
    AuthGuard,
    LoadingInterceptor,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
