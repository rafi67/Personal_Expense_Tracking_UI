import { Component, OnInit } from '@angular/core';
import { IncomesService } from '../../../services/incomes.service';
import { ExpensesService } from '../../../services/expenses.service';
import { Incomes } from '../../../models/income.model';
import { Expenses } from '../../../models/expense.model';
import { JwtTokenService } from '../../../services/jwt-token.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent implements OnInit {

  totalIncome: number = 0;
  totalExpense: number = 0;
  incomeList: Incomes [] = [];
  expenseList: Expenses[] = [];
  
  constructor(private incomeServcies: IncomesService, private expenseServices: ExpensesService,
    private jwtServices: JwtTokenService
  ) {}

  dateFormatter(date: string) : string {
    let temp = "";
    for(let j = 0; j<date.length; j++) {
     if(date[j]==='T') break;
       temp += date[j];
    }
    return temp;
  }

  calculateTotalIncome(obj: Incomes[]) : void {
    this.totalIncome = 0;
    for(let i = 0; i<obj.length; i++) {
      this.totalIncome += parseInt(obj[i].salaryAmount);
    }
  }

  getAllIncomes() : void {
    this.incomeServcies.getAllIncome(this.jwtServices.decodeToken().UserID).subscribe(res => {
      this.incomeList = res;

      this.calculateTotalIncome(this.incomeList);


      for(let i=0; i<res.length; i++) {
         this.incomeList[i].date = this.dateFormatter(res[i].date);
      }
    });
  }

  calculateTotalExpense(obj: Expenses[]) : void {
    this.totalExpense = 0;
    for(let i = 0; i<obj.length; i++) {
      this.totalExpense += parseInt(obj[i].expenseAmount);
    }
  }

  getAllExpenses() : void {

    this.expenseServices.getAllExpenses(this.jwtServices.decodeToken().UserID).subscribe(
      res => {
        for(let i = 0; i<res.length; i++) {
          res[i].expenseDate = this.dateFormatter(res[i].expenseDate);
          this.calculateTotalExpense(res);
        }
        this.expenseList = res;
      }
    );
  }


  ngOnInit(): void {
      this.getAllExpenses();
      this.getAllIncomes();
  }

}
