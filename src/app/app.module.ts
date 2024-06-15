import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NavbarComponent } from './component/navbar/navbar.component';
import { IncomeComponent } from './component/income/income.component';
import { ExpenseComponent } from './component/expense/expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { JWT_OPTIONS, JwtHelperService, JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptorService } from '../services/jwt-interceptor.service';
import { TransactionComponent } from './component/transaction/transaction.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ChangeUserPasswordComponent } from './component/change-user-password/change-user-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DeleteUserComponent } from './component/delete-user/delete-user.component';
import { SignupComponent } from './component/signup/signup.component';
import { FooterComponent } from './component/footer/footer.component';
import { AddIncomeComponent } from './component/add-income/add-income.component';
import { AddExpenseComponent } from './component/add-expense/add-expense.component';
import { AddIncomeCategoryComponent } from './component/add-income-category/add-income-category.component';
import { AddExpenseCategoryComponent } from './component/add-expense-category/add-expense-category.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IncomeComponent,
    ExpenseComponent,
    LoginComponent,
    TransactionComponent,
    DashboardComponent,
    ChangeUserPasswordComponent,
    DeleteUserComponent,
    SignupComponent,
    FooterComponent,
    AddIncomeComponent,
    AddExpenseComponent,
    AddIncomeCategoryComponent,
    AddExpenseCategoryComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule,
    NgbModule,
    CommonModule,
  ],
  providers: [
    provideClientHydration(), provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
