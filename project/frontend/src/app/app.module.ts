import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';
import { AgencyComponent } from './agency/agency.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterComponent } from './register/register.component';
import { AgenciesComponent } from './agencies/agencies.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileClientComponent } from './profile-client/profile-client.component';
import { ProfileAgencyComponent } from './profile-agency/profile-agency.component';
import { ClientObjectsComponent } from './client-objects/client-objects.component';
import { AddObjectFormComponent } from './add-object-form/add-object-form.component';
import { AddObjectComponent } from './add-object/add-object.component';
import { CanvasComponent } from './canvas/canvas.component';
import { AgencyCommentsComponent } from './agency-comments/agency-comments.component';
import { FormForCooperationComponent } from './form-for-cooperation/form-for-cooperation.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobsAgencyComponent } from './jobs-agency/jobs-agency.component';
import { CanvasWorkComponent } from './canvas-work/canvas-work.component';
import { CommentAndRateComponent } from './comment-and-rate/comment-and-rate.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminJobsComponent } from './admin-jobs/admin-jobs.component';
import { AdminWorkersComponent } from './admin-workers/admin-workers.component';
import { AdminCreateUserComponent } from './admin-create-user/admin-create-user.component';
import { CreateWorkerComponent } from './create-worker/create-worker.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientComponent,
    AdminComponent,
    AgencyComponent,
    LoginAdminComponent,
    RegisterComponent,
    AgenciesComponent,
    ChangePasswordComponent,
    ProfileClientComponent,
    ProfileAgencyComponent,
    ClientObjectsComponent,
    AddObjectFormComponent,
    AddObjectComponent,
    CanvasComponent,
    AgencyCommentsComponent,
    FormForCooperationComponent,
    JobsComponent,
    JobsAgencyComponent,
    CanvasWorkComponent,
    CommentAndRateComponent,
    AdminUsersComponent,
    AdminJobsComponent,
    AdminWorkersComponent,
    AdminCreateUserComponent,
    CreateWorkerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
