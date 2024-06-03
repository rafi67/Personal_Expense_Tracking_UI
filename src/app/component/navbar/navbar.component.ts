import { Component, Injectable, ViewChild, inject } from '@angular/core';
import { JwtTokenService } from '../../../services/jwt-token.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ChangeUserPasswordComponent } from '../change-user-password/change-user-password.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

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

  private modalService = inject(NgbModal);

  constructor(private jwtServices: JwtTokenService, private router: Router, private appComponent: AppComponent) {}

  openModal() : void {
    const modalRef = this.modalService.open(ChangeUserPasswordComponent);
    modalRef.componentInstance.name = 'World';
  }

  openDeleteUser() : void {
    const modalRef = this.modalService.open(DeleteUserComponent);
    modalRef.componentInstance.name = 'World2';
  }

  logout() {
    this.jwtServices.removeToken();
    this.appComponent.isLogin = false;
    this.appComponent.isLogout = true;
    this.router.navigate(['/Login']);
  }

}
