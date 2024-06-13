import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomeComponent } from './component/income/income.component';
import { ExpenseComponent } from './component/expense/expense.component';
import { LoginComponent } from './component/login/login.component';
import { authGuard, authGuard2 } from '../auth/auth.guard';
import { TransactionComponent } from './component/transaction/transaction.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SignupComponent } from './component/signup/signup.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AddIncomeComponent } from './component/add-income/add-income.component';

const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent, canActivate: [authGuard2] },
  { path: 'Signup', component: SignupComponent, canActivate: [authGuard2] },
  { path: 'Navbar', component: NavbarComponent, canActivate: [authGuard], 
  children: [
    { path: 'Income', component: IncomeComponent },
    { path: 'Expense', component: ExpenseComponent },
    { path: 'Transaction', component: TransactionComponent },
    { path: 'DashBoard', component: DashboardComponent },
    { path: 'AddIncome', component: AddIncomeComponent },
  ]
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
