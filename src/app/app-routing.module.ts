import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomeComponent } from './component/income/income.component';
import { ExpenseComponent } from './component/expense/expense.component';
import { LoginComponent } from './component/login/login.component';
import { LayoutComponent } from './component/layout/layout.component';
import { authGuard, authGuard2 } from '../auth/auth.guard';
import { TransactionComponent } from './component/transaction/transaction.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ChangeUserPasswordComponent } from './component/change-user-password/change-user-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent, canActivate: [authGuard2] },
  { path: 'Income', component: IncomeComponent, canActivate: [authGuard], },
  { path: 'Expense', component: ExpenseComponent, canActivate: [authGuard] },
  { path: 'Layout', component: LayoutComponent, canActivate: [authGuard], 
  children: [
    { path: 'Income', component: IncomeComponent },
    { path: 'Expense', component: ExpenseComponent },
    { path: 'Transaction', component: TransactionComponent },
    { path: 'DashBoard', component: DashboardComponent },
    { path: 'ChangePassword', component: ChangeUserPasswordComponent },
  ]
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
