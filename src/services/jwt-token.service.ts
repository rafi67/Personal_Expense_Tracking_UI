import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor(private jwtHelper: JwtHelperService, @Inject(PLATFORM_ID) private platformId: Object) { }

  setToken(token: string) : void {
    if(isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_token', token);
    }
    
  }

  getToken() : any {
    if(isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  isTokenExpired() : any {
    const token = this.getToken();
    return token ? this.jwtHelper.isTokenExpired(token) : true;
  }

  removeToken() : void {
    localStorage.removeItem('access_token');
  }

  decodeToken() : any {
    const token = this.getToken();
    return token ? this.jwtHelper.decodeToken(token) : null;
  }

}
