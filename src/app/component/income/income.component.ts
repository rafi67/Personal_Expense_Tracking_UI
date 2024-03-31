import { Component, OnInit } from '@angular/core';
import { IncomesService } from '../../../services/incomes.service';
import { AddIncomes, Categories, Incomes } from '../../../models/income.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent implements OnInit {

  selectedOption: string = 'option1';
  incomeList: Incomes [] = [];
  totalIncome: number = 0;
  incomeForm!: FormGroup;
  categoryList: Categories [] = [];
  addIncomes: AddIncomes  = {
    incomeId: '',
    salaryTitle: '',
    salaryAmount: '',
    categoryID: '',
    date: '',
    reference: '',
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
    for(let i = 0; i<obj.length; i++) {
      this.totalIncome += parseInt(obj[i].salaryAmount);
    }
  }

  ngOnInit(): void {
      this.incomeServices.getAllIncome().subscribe(res => {
        this.incomeList = res;
        this.calculateTotalIncome(this.incomeList);
        for(let i=0; i<res.length; i++) {
           let date = this.incomeList[i].date.toString();
           this.incomeList[i].date = this.dateFormatter(date);
        }
      });
      this.incomeServices.getAllCategories().subscribe(
        res => {
          this.categoryList = res;
        }
      );
      this.incomeForm = this.formBuilder.group({
        incomeId: [''],
        salaryTitle: ['', Validators.required],
        salaryAmount: ['', Validators.required],
        categoryID: ['', Validators.required],
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
    this.incomeServices.addIncome(this.addIncomes).subscribe({
      next: () => {
        this.incomeServices.getAllIncome().subscribe(
          res => {
            for(let i=0; i<res.length; i++) {
              let temp = res[i].date;
              res[i].date = this.dateFormatter(temp);
            }
            this.incomeList = res;
            this.calculateTotalIncome(this.incomeList);
          }
        );
        this.incomeForm.reset();
        this.totalIncome = 0;
        this.selectedOption = 'option1';
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
        this.incomeServices.getAllIncome().subscribe(
          res => {  
            for(let i = 0; i<res.length; i++) {
              res[i].date = this.dateFormatter(res[i].date);
            }
            this.incomeList = res;
            this.totalIncome = 0;
            this.calculateTotalIncome(this.incomeList);
          }
        );
      },
      error: () => {
        alert("Failed to Delete");
      }
    });
  }

  

}
