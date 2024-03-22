import { Component } from '@angular/core';
import { Incomes } from '../models/income.model';
import { IncomesService } from '../services/incomes.service';
import { ExpensesService } from '../services/expenses.service';
import { Expenses } from '../models/expense.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Personal_Expense_Tracking_UI';
  incomeData: Incomes[] = [];
  constructor(private incomeServices: IncomesService) {}

  loadData() {
    this.incomeServices.getAllIncome().subscribe(
      res => {
        this.incomeData = res;
        for(let i=0; i<this.incomeData.length; i++) {
          document.write('<p>'+this.incomeData[i].salaryAmount+'</p>');
        }
        alert("Successfull");
      }
    );
  }

}
