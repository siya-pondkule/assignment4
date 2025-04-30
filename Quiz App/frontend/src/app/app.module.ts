import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { StudentComponent } from './dashboard/student/student.component';
import { CreateTestComponent } from './quiz/create-test/create-test.component';
import { GenerateReportComponent } from './reports/generate-report/generate-report.component';
import { GiveTestComponent } from './student/give-test/give-test.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    AdminComponent,
    StudentComponent,
    CreateTestComponent,
    GenerateReportComponent,
    GiveTestComponent
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
