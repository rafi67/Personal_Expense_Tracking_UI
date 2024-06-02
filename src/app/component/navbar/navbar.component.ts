import { Component, Injectable, ViewChild } from '@angular/core';
import { JwtTokenService } from '../../../services/jwt-token.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ChangeUserPasswordComponent } from '../change-user-password/change-user-password.component';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @ViewChild(ChangeUserPasswordComponent) modal!: ChangeUserPasswordComponent;

  constructor(private jwtServices: JwtTokenService, private router: Router, private appComponent: AppComponent) {}

  openModal() : void {
    this.modal.open();
  }

  closeModal() : void {
    this.modal.close();
  }

  logout() {
    this.jwtServices.removeToken();
    this.appComponent.isLogin = false;
    this.appComponent.isLogout = true;
    this.router.navigate(['/Login']);
  }

}
