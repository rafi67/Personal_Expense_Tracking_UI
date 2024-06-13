import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IncomesService } from '../../../services/incomes.service';
import { ExpensesService } from '../../../services/expenses.service';
import { JwtTokenService } from '../../../services/jwt-token.service';
import { Incomes } from '../../../models/income.model';
import { Expenses } from '../../../models/expense.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  title = 'Dashboard';
  chart: any = [];
  totalIncome: number = 0;
  totalExpense: number = 0;
  incomeList: Incomes[] = [];
  expenseList: Expenses[] = [];
  

  constructor(private incomeServices: IncomesService, private expenseServices: ExpensesService,
    private jwtService: JwtTokenService
  ) {}

  renderChart() : void {
    this.chart = new Chart('canvas', {
      type: 'bar', 
      data: {
        labels: ['Income', 'Expense'],
        datasets: [
          {
            label: 'Transaction', 
            data: [this.totalIncome, this.totalExpense, 10000, 20000, 30000],
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          }
        ],
      },
      options: {
        plugins: {
            legend: {
              labels: {
                color: 'black',
                font: {
                  size: 18,
                },
              },
            },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: 'black',
              font: {
                size: 18,
              },
            },
          },
          x: {
            ticks: {
              color: 'black',
              font: {
                size: 18,
              },
            },
          },
        },
      },
    });
    this.chart.resize(800, 800);
  }

  calculateTotalIncome() {
    return this.incomeServices.getAllIncome(this.jwtService.decodeToken().UserID).pipe(
      map(income => {
        return income.reduce((sum, item) => sum + parseInt(item.salaryAmount), 0);
      })
    );
  }

  calculateTotalExpense() {
    return this.expenseServices.getAllExpenses(this.jwtService.decodeToken().UserID).pipe(
     map( expense => {
      return expense.reduce((sum, item)=> sum + parseInt(item.expenseAmount), 0);
    })
    );
  }

  ngOnInit(): void {
    forkJoin({
      Income: this.calculateTotalIncome(),
      Expense: this.calculateTotalExpense()
    }).subscribe(results => {
      this.totalIncome = results.Income;
      this.totalExpense = results.Expense;
      this.renderChart();
    });
  }

  
}
