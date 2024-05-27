import { Component, OnInit } from '@angular/core';
import { ExpenseCategories, Expenses } from '../../../models/expense.model';
import { ExpensesService } from '../../../services/expenses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtTokenService } from '../../../services/jwt-token.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent implements OnInit {

  expenseList: Expenses[] = [];
  totalExpense: number = 0;
  expenseForm!: FormGroup;
  expenseCategoryList: ExpenseCategories[] = [];
  addExpenses: Expenses = {
    expenseID: '',
    expenseTitle: '',
    expenseAmount: '',
    expenseDate: '',
    expenseCategoryID: '',
    expenseReference: '',
    userID: '',
    expenseCategories: {
      expenseCategoryID: '0',
      categoryName: ''
    },
    users: {
      userID: '',
      firstName: '',
      lastName: '',
      gender: '',
      userName: '',
      password: '',
      email: '',
      userPhoto: '',
      userRole: ''
    }
  };

  constructor(private expenseServices: ExpensesService, private formBuilder: FormBuilder,
    private jwtServices: JwtTokenService
  ) {}

  ngOnInit(): void {
      this.getAllExpenses();

      this.expenseServices.getAllExpenseCategories().subscribe(
        res => {
          this.expenseCategoryList = res;
        }
      );

      this.expenseForm = this.formBuilder.group({
        expenseID: [''],
        expenseTitle: ['', Validators.required],
        expenseAmount: ['', Validators.required],
        expenseCategoryID: ['option1', Validators.required],
        expenseDate: ['', Validators.required],
        expenseReference: ['', Validators.required],
      });
  }

  dateFormatter(date: string) : string {
    let temp = "";
    for(let j = 0; j<date.length; j++) {
     if(date[j]==='T') break;
       temp += date[j];
    }
    return temp;
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

  addExpense() : void {
    this.addExpenses.expenseID = '0';
    this.addExpenses.expenseTitle = this.expenseForm.controls['expenseTitle'].getRawValue();
    this.addExpenses.expenseAmount = this.expenseForm.controls['expenseAmount'].getRawValue();
    this.addExpenses.expenseCategoryID = this.expenseForm.controls['expenseCategoryID'].getRawValue();
    this.addExpenses.expenseDate = this.expenseForm.controls['expenseDate'].getRawValue();
    this.addExpenses.expenseReference = this.expenseForm.controls['expenseReference'].getRawValue();
    

    this.expenseServices.addExpense(this.addExpenses).subscribe({
      next: () => {
        this.getAllExpenses();
      },
      error: () => {
        alert("Failed to add");
      }
    });


    this.expenseForm.reset();
    this.expenseForm.controls['expenseCategoryID'].setValue('option1');
  }

  deleteExpense(id: string) {
    this.expenseServices.deleteExpense(id).subscribe({
      next: () => {
        alert('SuccessFully Deleted');
        this.getAllExpenses();
      },
      
      error: () => alert('Failed to delete')
    });
  }

}
