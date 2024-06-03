import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserData } from '../../../models/user.model';

@Component({
  selector: 'app-change-user-password',
  templateUrl: './change-user-password.component.html',
  standalone: false,
  styleUrl: './change-user-password.component.scss'
})
export class ChangeUserPasswordComponent implements OnInit {

	activeModal = inject(NgbActiveModal);

	userPasswordForm!: FormGroup;
	userList: UserData [] = [];

  private modalService = inject(NgbModal);

  constructor(private router: Router, private userServices: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
	this.userPasswordForm = this.formBuilder.group({
		userId: '',
		password: '',
	});

	this.userPasswordForm.controls['userId'].setValue('option1');

	this.userServices.getAllUser().subscribe(
		data => this.userList = data
	);
  }

	close() : void {
		this.activeModal.dismiss('Cross click');
		this.router.navigate(['/Layout']);
	}

	closeModal() : void {
		this.activeModal.close('Close click');
		this.router.navigate(['/Layout']);
	}

	changePassword() : void {
		let id = this.userPasswordForm.controls['userId'].getRawValue();
		let password = this.userPasswordForm.controls['password'].getRawValue();
		this.userServices.changePassword(id, password).subscribe();
		this.closeModal();
	}

  /*open() : void {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }*/

}
