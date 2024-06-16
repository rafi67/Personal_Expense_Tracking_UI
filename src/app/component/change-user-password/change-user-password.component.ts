import { Component, OnInit, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserData } from '../../../models/user.model';
import { ToastComponent } from '../toast/toast.component';

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


  constructor(private userServices: UserService, private formBuilder: FormBuilder,
	private toastr: ToastComponent
  ) {}

  ngOnInit(): void {
	this.userPasswordForm = this.formBuilder.group({
		userId: '',
		password: '',
	});

	this.userPasswordForm.controls['userId'].setValue('option1');

	this.userServices.getAllUser().subscribe(
		data => {
			this.userList = data;
			this.userList.shift();
		}
	);
  }

	close() : void {
		this.activeModal.dismiss('Cross click');
	}

	closeModal() : void {
		this.activeModal.close('Close click');
	}

	changePassword() : void {
		let id = this.userPasswordForm.controls['userId'].getRawValue();
		let password = this.userPasswordForm.controls['password'].getRawValue();

		this.userServices.changePassword(id, password).subscribe(
			res => {
				if(res.toString()=='200') this.toastr.showSuccess('Done', 'Change Password');
			}
		);
		this.closeModal();
	}

}
