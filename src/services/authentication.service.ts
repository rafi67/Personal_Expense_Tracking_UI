import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtToken, UserData } from '../models/user.model';
import { Login } from '../models/login.model';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = 'https://localhost:7112/api/Authentication/';

  constructor(private http: HttpClient, private jwtToken: JwtTokenService) { }

  login(obj: Login) : Observable<JwtToken> {
    return this.http.post<JwtToken>(this.baseUrl+'Login', obj);
  }

  signup(obj: UserData) : Observable<JwtToken> {
    return this.http.post<JwtToken>(this.baseUrl+'Signup', obj);
  }

  uploadImage(image: FormData) : Observable<any> {
    return this.http.post<Response>(this.baseUrl+'UploadImage/'+this.jwtToken.decodeToken().UserID, image);
  }

}
