import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtToken, UserImage } from '../models/user.model';
import { Login } from '../models/login.model';
import { userData } from '../UserData/UserData';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = 'https://localhost:7112/api/Authentication/';

  constructor(private http: HttpClient) { }

  login(obj: Login) : Observable<JwtToken> {
    return this.http.post<JwtToken>(this.baseUrl+'Login', obj);
  }

  signup(obj: userData) : Observable<JwtToken> {
    return this.http.post<JwtToken>(this.baseUrl+'Signup', obj);
  }

  uploadImage(image: File, id: string) : Observable<Response> {
    var formData = new FormData();
    formData.append('image', image);
    return this.http.post<Response>(this.baseUrl+'UploadImage/'+id, formData);
  }

}
