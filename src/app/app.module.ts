import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { LayoutComponent } from './component/layout/layout.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { IncomeComponent } from './component/income/income.component';
import { ExpenseComponent } from './component/expense/expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { JWT_OPTIONS, JwtHelperService, JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptorService } from '../services/jwt-interceptor.service';
import { TransactionComponent } from './component/transaction/transaction.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavbarComponent,
    IncomeComponent,
    ExpenseComponent,
    LoginComponent,
    TransactionComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule,
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
