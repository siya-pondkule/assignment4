import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { StudentComponent } from './dashboard/student/student.component';
import { CreateTestComponent } from './quiz/create-test/create-test.component';
import { GenerateReportComponent } from './reports/generate-report/generate-report.component';
import { GiveTestComponent } from './student/give-test/give-test.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'admin-dashboard', component: AdminComponent },
  { path: 'student-dashboard', component: StudentComponent },
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'create-test', component: CreateTestComponent },
  { path: 'generate-report', component: GenerateReportComponent },
  { path: 'give-test', component: GiveTestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
