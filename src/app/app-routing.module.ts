import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomeComponent } from './component/income/income.component';
import { ExpenseComponent } from './component/expense/expense.component';

const routes: Routes = [
  { path: 'Income', component: IncomeComponent },
  {path:'Expense', component: ExpenseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
