import { Component, OnInit } from '@angular/core';
import { IncomesService } from '../../../services/incomes.service';
import { Categories, Incomes } from '../../../models/income.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtTokenService } from '../../../services/jwt-token.service';

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
    userID: '',
    categories: {
      categoryID: '',
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

  constructor(private incomeServices: IncomesService, private formBuilder: FormBuilder,
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
    this.incomeServices.getAllIncome(this.jwtServices.decodeToken().UserID).subscribe(res => {
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
