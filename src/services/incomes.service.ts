import { Injectable } from '@angular/core';
import { Incomes } from '../models/income.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {

  constructor(private http: HttpClient) { }
  baseURL: string = "https://localhost:7112/api/Income/";

  getAllIncome() : Observable<Incomes[]> {
    return this.http.get<Incomes[]>(this.baseURL+"GetAllIncomes");
  }

  getIncome(id: string) : Observable<Incomes> {
    return this.http.get<Incomes>(this.baseURL+"GetIncome?id="+id);
  }

  addIncome(obj: Incomes) : Observable<Incomes> {
    return this.http.post<Incomes>(this.baseURL+"AddIncome", obj);
  }
  
  deleteIncome(id: string) : Observable<Incomes> {
    return this.http.delete<Incomes>(this.baseURL+"?id="+id);
  }

}
