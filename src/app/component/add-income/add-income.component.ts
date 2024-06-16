import { Component, OnInit, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IncomesService } from '../../../services/incomes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categories, Incomes } from '../../../models/income.model';
import { JwtTokenService } from '../../../services/jwt-token.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  standalone: false,
  styleUrl: './add-income.component.scss'
})
export class AddIncomeComponent implements OnInit {

  activeModal = inject(NgbActiveModal);

  incomeForm!: FormGroup;

  income: Incomes = {
    incomeId: '',
    salaryTitle: '',
    salaryAmount: '',
    categoryID: '',
    date: '',
    reference: '',
    userID: '',
    categories: {
      categoryID: '',
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
    },
  };

  categoryList: Categories [] = [];
  
  constructor(private incomeServices: IncomesService, private formBuilder: FormBuilder,
    private jwtToken: JwtTokenService, private toastr: ToastComponent
  ) {}

  ngOnInit(): void {
      this.incomeForm = this.formBuilder.group({
        salaryTitle: ['', Validators.required],
        salaryAmount: ['', Validators.required],
        categoryID: ['', Validators.required],
        date: ['', Validators.required],
        reference: ['', Validators.required],
      });
      this.incomeForm.controls['categoryID'].setValue('option1');

      this.incomeServices.getAllCategories().subscribe(
        category => this.categoryList = category
      );
  }


  close() : void {
		this.activeModal.dismiss('Cross click');
	}

	closeModal() : void {
		this.activeModal.close('Close click');
	}


  addIncome() : void {
    this.income.incomeId = '0';
    this.income.salaryTitle = this.incomeForm.controls['salaryTitle'].getRawValue();
    this.income.salaryAmount = this.incomeForm.controls['salaryAmount'].getRawValue();
    this.income.categoryID = this.incomeForm.controls['categoryID'].getRawValue();
    this.income.date = this.incomeForm.controls['date'].getRawValue();
    this.income.reference = this.incomeForm.controls['reference'].getRawValue();
    this.income.userID = this.jwtToken.decodeToken().UserID;
    this.income.categories.categoryID = '0';
    this.income.users.userID = '0';

    this.incomeServices.addIncome(this.income).subscribe(
      res => {
        if(res.toString()=='200') this.toastr.showSuccess('Done', 'Add Income');
        this.incomeForm.reset();
        this.incomeForm.controls['categoryID'].setValue('option1');
        this.closeModal();
      }
    );
    
  }

}
