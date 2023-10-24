import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { AgencyComponent } from './agency/agency.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterComponent } from './register/register.component';
import { AgenciesComponent } from './agencies/agencies.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileClientComponent } from './profile-client/profile-client.component';
import { ProfileAgencyComponent } from './profile-agency/profile-agency.component';
import { AddObjectFormComponent } from './add-object-form/add-object-form.component';
import { AddObjectComponent } from './add-object/add-object.component';
import { ClientObjectsComponent } from './client-objects/client-objects.component';
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



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'client', component: ClientComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'agency', component: AgencyComponent },
  { path: 'loginAdmin', component: LoginAdminComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'agencies', component: AgenciesComponent },
  {path: 'changePassword',component:ChangePasswordComponent},
  {path: 'profileClient',component:ProfileClientComponent},
  {path: 'profileAgency',component:ProfileAgencyComponent},
  {path: 'clientObjects',component:ClientObjectsComponent},
  {path: 'addObjectForm',component:AddObjectFormComponent},
  {path: 'addObject',component:AddObjectComponent},
  {path: 'canvas',component:CanvasComponent},
  {path: 'agencyComments',component:AgencyCommentsComponent},
  {path: 'formForCooperation',component:FormForCooperationComponent},
  {path: 'jobs',component:JobsComponent},
  {path: 'jobsAgency',component:JobsAgencyComponent},
  {path: 'canvasWork',component:CanvasWorkComponent},
  {path: 'adminUsers',component:AdminUsersComponent},
  {path: 'commentAndRate',component:CommentAndRateComponent},
  {path: 'adminJobs',component:AdminJobsComponent},
  {path: 'adminWorkers',component:AdminWorkersComponent},
  {path: 'adminCreateUser',component:AdminCreateUserComponent},
  {path: 'createWorker',component:CreateWorkerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
