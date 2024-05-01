import { Component, OnInit } from '@angular/core';
import { IncomesService } from '../../../services/incomes.service';
import { Categories, Incomes } from '../../../models/income.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent implements OnInit {

  incomeList: Incomes [] = [];
  totalIncome: number = 0;
  incomeForm!: FormGroup;
  categoryList: Categories [] = [];
  addIncomes: Incomes  = {
    incomeId: '',
    salaryTitle: '',
    salaryAmount: '',
    categoryID: '',
    date: '',
    reference: '',
    categories: {
      categoryID: '',
      categoryName: ''
    }
  };

  constructor(private incomeServices: IncomesService, private formBuilder: FormBuilder) {}

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
    this.incomeServices.getAllIncome().subscribe(res => {
      this.incomeList = res;

      this.calculateTotalIncome(this.incomeList);


      for(let i=0; i<res.length; i++) {
         this.incomeList[i].date = this.dateFormatter(res[i].date);
      }
    });
  }

  ngOnInit(): void {
      this.getAllIncomes();
      
      this.incomeServices.getAllCategories().subscribe(
        res => {
          this.categoryList = res;
        }
      );

      this.incomeForm = this.formBuilder.group({
        incomeId: [''],
        salaryTitle: ['', Validators.required],
        salaryAmount: ['', Validators.required],
        categoryID: ['option1', Validators.required],
        date: ['', Validators.required],
        reference: ['', Validators.required],
      });
  }

  addIncome() : void {
    this.addIncomes.incomeId = '0',
    this.addIncomes.salaryTitle = this.incomeForm.controls['salaryTitle'].getRawValue();
    this.addIncomes.salaryAmount = this.incomeForm.controls['salaryAmount'].getRawValue();
    this.addIncomes.categoryID = this.incomeForm.controls['categoryID'].getRawValue();
    this.addIncomes.date = this.incomeForm.controls['date'].getRawValue();
    this.addIncomes.reference = this.incomeForm.controls['reference'].getRawValue();
    this.addIncomes.categories = {
      categoryID: '0',
      categoryName: ''
    }

    this.incomeServices.addIncome(this.addIncomes).subscribe({
      next: () => {
        this.getAllIncomes();

        this.incomeForm.reset();

        this.incomeForm.controls['categoryID'].setValue('option1');
      },

      error: () => {
        alert('Failed to add Data');
      },
    });
  }

  deleteIncome(id: string) : void {
    this.incomeServices.deleteIncome(id).subscribe({
      next: () => {
        alert("Successfully Deleted");
        this.getAllIncomes();
      },

      error: () => {
        alert("Failed to Delete");
      }
    });
  }

  

}
