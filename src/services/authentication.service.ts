import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtToken } from '../models/user.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = 'https://localhost:7112/api/Authentication/';

  constructor(private http: HttpClient) { }

  login(obj: Login) : Observable<JwtToken> {
    return this.http.post<JwtToken>(this.baseUrl+'Login', obj);
  }

}
