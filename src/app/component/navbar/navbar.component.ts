import { Component, ViewContainerRef } from '@angular/core';
import { JwtTokenService } from '../../../services/jwt-token.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private jwtServices: JwtTokenService, private router: Router, private appComponent: AppComponent,
    private container: ViewContainerRef
  ) {}

  logout() {
    this.jwtServices.removeToken();
    this.appComponent.isLogin = false;
    this.appComponent.isLogout = true;
    this.router.navigate(['/Login']);
  }

}
