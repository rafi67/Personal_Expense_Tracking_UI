import { Component, Injectable, OnInit, ViewChild, inject } from '@angular/core';
import { JwtTokenService } from '../../../services/jwt-token.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ChangeUserPasswordComponent } from '../change-user-password/change-user-password.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { AddIncomeComponent } from '../add-income/add-income.component';
import { AddExpenseComponent } from '../add-expense/add-expense.component';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  @ViewChild(ChangeUserPasswordComponent) modal!: ChangeUserPasswordComponent;
  @ViewChild(AddIncomeComponent) modal2!: AddIncomeComponent;
  @ViewChild(AddExpenseComponent) modal3!: AddExpenseComponent;

  private modalService = inject(NgbModal);
  userRole: string = '';

  constructor(private jwtServices: JwtTokenService, private router: Router, private appComponent: AppComponent) {}

  ngOnInit(): void {
      this.userRole = this.jwtServices.decodeToken().UserRole;
  }

  openModalChangePassword() : void {
    const modalRef = this.modalService.open(ChangeUserPasswordComponent);
    modalRef.componentInstance.name = 'World';
  }

  openAddIncomeModal() : void {
    const modalRef = this.modalService.open(AddIncomeComponent);
    modalRef.componentInstance.name = 'World3';
  }

  openAddExpenseModal() : void {
    const modalRef = this.modalService.open(AddExpenseComponent);
    modalRef.componentInstance.name = 'World4';
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
