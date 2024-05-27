import { Injectable } from '@angular/core';
import { Categories, Incomes } from '../models/income.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {

  constructor(private http: HttpClient) { }
  baseURL: string = "https://localhost:7112/api/Income/";
  baseURL2: string = "https://localhost:7112/api/Categories/";

  getAllIncome(id: string) : Observable<Incomes[]> {
    return this.http.get<Incomes[]>(this.baseURL+"GetAllIncomes/"+id);
  }

  getIncome(id: string) : Observable<Incomes> {
    return this.http.get<Incomes>(this.baseURL+"GetIncome/+"+id);
  }

  addIncome(obj: Incomes) : Observable<Response> {
    return this.http.post<Response>(this.baseURL+"AddIncome", obj);
  }
  
  deleteIncome(id: string) : Observable<Response> {
    return this.http.delete<Response>(this.baseURL+'DeleteIncome/'+id);
  }

  getAllCategories() : Observable<Categories[]> {
    return this.http.get<Categories[]>(this.baseURL2+"GetAllCategory");
  }

}
