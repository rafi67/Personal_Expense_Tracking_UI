import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseCategories, Expenses } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  baseURL = "https://localhost:7112/api/Expense/";
  expenseCategoriesUrl = "https://localhost:7112/api/ExpenseCategories/"

  constructor(private http: HttpClient) { }

  getAllExpenses() : Observable<Expenses[]> {
    return this.http.get<Expenses[]>(this.baseURL+"GetAllExpenses");
  }

  getAllExpenseCategories() : Observable<ExpenseCategories[]> {
    return this.http.get<ExpenseCategories[]>(this.expenseCategoriesUrl+"GetAllExpenseCategory");
  }

  getExpense(id: string) : Observable<Expenses> {
    return this.http.get<Expenses>(this.baseURL+"/GetExpense/"+id);
  }

  addExpense(obj: Expenses) : Observable<Expenses> {
    return this.http.post<Expenses>(this.baseURL+"AddExpense/", obj);
  }

  deleteExpense(id: string) : Observable<Expenses>{
    return this.http.delete<Expenses>(this.baseURL+"DeleteExpense/"+id);
  }

}
