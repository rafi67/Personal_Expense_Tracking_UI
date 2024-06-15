import { Component, Injectable, OnInit, ViewChild, inject } from '@angular/core';
import { JwtTokenService } from '../../../services/jwt-token.service';
import { Router } from '@angular/router';
import { ChangeUserPasswordComponent } from '../change-user-password/change-user-password.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { AddIncomeComponent } from '../add-income/add-income.component';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { UserService } from '../../../services/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ChangePasswordComponent } from '../change-password/change-password.component';

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
  @ViewChild(ChangePasswordComponent) modal4!: ChangePasswordComponent;

  private modalService = inject(NgbModal);
  userRole: string = '';
  imageUrl: SafeUrl | undefined;

  constructor(private jwtServices: JwtTokenService, private router: Router,
    private userServices: UserService, private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
      this.userRole = this.jwtServices.decodeToken().UserRole;
      this.loadUserImage();
  }

  openModalChangePassword() : void {
    const modalRef = this.modalService.open(ChangeUserPasswordComponent);
    modalRef.componentInstance.name = 'World';
  }

  openChangePassword() : void {
    const modalRef = this.modalService.open(ChangePasswordComponent);
    modalRef.componentInstance.name = 'World5';
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

  loadUserImage() : void {
    this.userServices.getUserImage(this.jwtServices.decodeToken().UserID).subscribe(blob => {
      const objectURL = URL.createObjectURL(blob);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  logout() {
    this.jwtServices.removeToken();
    this.router.navigate(['/Login']);
  }

}
