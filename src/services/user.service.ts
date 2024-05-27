import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';
import { JwtToken, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'https://localhost:7112/api/Users/';

  constructor(private http: HttpClient) { }

  getAllUser() : Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl+'GetAllUser');
  }

  getUser(id: string) : Observable<User> {
    return this.http.get<User>(this.baseUrl+'GetUser/'+id);
  }

  addUser(obj: User) : Observable<Response> {
    return this.http.post<Response>(this.baseUrl+'Login', obj);
  }

  updateUser(obj: User) : Observable<Response> {
    return this.http.put<Response>(this.baseUrl+'UpdateUser', obj);
  }

  deleteUser(id: string): Observable<Response> {
    return this.http.delete<Response>(this.baseUrl+'DeleteUser/'+id);
  }

  
  
}
