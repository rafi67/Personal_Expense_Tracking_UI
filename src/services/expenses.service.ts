import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expenses } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  baseURL = "https://localhost:7112/api/Expense/";

  constructor(private http: HttpClient) { }

  getAllExpenses() : Observable<Expenses[]> {
    return this.http.get<Expenses[]>(this.baseURL+"GetAllExpenses");
  }

  getExpense(id: string) : Observable<Expenses> {
    return this.http.get<Expenses>(this.baseURL+"/GetExpense?id="+id);
  }

  addExpense(obj: Expenses) : Observable<Expenses> {
    return this.http.post<Expenses>(this.baseURL+"AddExpense", obj);
  }

  deleteExpense(id: string) : Observable<Expenses>{
    return this.http.delete<Expenses>(this.baseURL+"DeleteExpense?id="+id);
  }

}
