import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpensesService } from '../../../services/expenses.service';
import { ExpenseCategories, Expenses } from '../../../models/expense.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JwtTokenService } from '../../../services/jwt-token.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  standalone: false,
  styleUrl: './add-expense.component.scss'
})
export class AddExpenseComponent implements OnInit {

  activeModal = inject(NgbActiveModal);

  expenseForm!: FormGroup;
  expense : Expenses = {
    expenseID: '',
    expenseTitle: '',
    expenseAmount: '',
    expenseDate: '',
    expenseCategoryID: '',
    expenseReference: '',
    userID: '',
    expenseCategories: {
      expenseCategoryID: '',
      categoryName: '',
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
      userRole: '',
    }
  };

  categoryList: ExpenseCategories [] = [];

  constructor(private expenseServices: ExpensesService, private formBuilder: FormBuilder,
    private jwtToken: JwtTokenService, private toastr: ToastComponent
  ) {}

  ngOnInit(): void {
    this.expenseServices.getAllExpenseCategories().subscribe(
      category => this.categoryList = category
    );  
    
    this.expenseForm = this.formBuilder.group({
      expenseTitle: ['', Validators.required],
      expenseAmount: ['', Validators.required],
      expenseDate: ['', Validators.required],
      expenseCategoryID: ['', Validators.required],
      expenseReference: ['', Validators.required],
      userID: ['', Validators.required],
    });
    
    this.expenseForm.controls['expenseCatgoryID'].setValue('option1');
  }

  close() : void {
		this.activeModal.dismiss('Cross click');
	}

	closeModal() : void {
		this.activeModal.close('Close click');
	}

  addExpense() : void {
    this.expense.expenseID = '0';
    this.expense.expenseTitle = this.expenseForm.controls['expenseTitle'].getRawValue();
    this.expense.expenseAmount = this.expenseForm.controls['expenseAmount'].getRawValue();
    this.expense.expenseDate = this.expenseForm.controls['expenseDate'].getRawValue();
    this.expense.expenseCategoryID = this.expenseForm.controls['expenseCategoryID'].getRawValue();
    this.expense.expenseReference = this.expenseForm.controls['expenseReference'].getRawValue();
    this.expense.userID = this.jwtToken.decodeToken().UserID;
    this.expense.users.userID = '0';
    this.expense.expenseCategories.expenseCategoryID = '0';
    this.expenseServices.addExpense(this.expense).subscribe(
      res => {
        if(res.toString()=='200') this.toastr.showSuccess('Done', 'Add Expense');
        }
    );

    this.expenseForm.reset();
    this.expenseForm.controls['expenseCategoryID'].setValue('option1');

    this.closeModal();
  }

}
