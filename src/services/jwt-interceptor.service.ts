import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private jwtHelper: JwtTokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    const token = this.jwtHelper.getToken();
    if(token) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer '+token,
        }
      });
    }

    return next.handle(req);
  }

}
