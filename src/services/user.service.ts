import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtToken, User } from '../models/user.model';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'https://localhost:7112/api/Users/';

  constructor(private http: HttpClient, private jwtToken: JwtTokenService) { }

  getAllUser() : Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl+'GetAllUser');
  }

  getUser(id: string) : Observable<User> {
    return this.http.get<User>(this.baseUrl+'GetUser/'+id);
  }

  addUser(obj: User) : Observable<Response> {
    return this.http.post<Response>(this.baseUrl+'Login', obj);
  }

  changePassword(id: string, password: string) : Observable<Response> {
    return this.http.get<Response>(this.baseUrl+'ChangePassword/'+id+'/'+password);
  }

  getUserImage(id: string) : Observable<Blob> {
    return this.http.get(this.baseUrl+"GetUserImage/"+id, { responseType: 'blob' });
  }
  updateUser(obj: User) : Observable<Response> {
    return this.http.put<Response>(this.baseUrl+'UpdateUser', obj);
  }

  updateUserImage(image: FormData) : Observable<any> {
    return this.http.put<Response>(this.baseUrl+'UpdateUserImage/'+this.jwtToken.decodeToken().UserID, image);
  }

  deleteUser(id: string): Observable<Response> {
    return this.http.delete<Response>(this.baseUrl+'DeleteUser/'+id);
  }
  
}
