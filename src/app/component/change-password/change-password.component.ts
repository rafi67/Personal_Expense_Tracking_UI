import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { JwtTokenService } from '../../../services/jwt-token.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {

  activeModal = inject(NgbActiveModal);

  passwordForm!: FormGroup;

  constructor(private  formBuilder: FormBuilder, private userServices: UserService,
    private jwtToken: JwtTokenService
  ) {}

  ngOnInit(): void {
      this.passwordForm = this.formBuilder.group({
        password: ['', Validators.required]
      });
  }

  close() : void {
		this.activeModal.dismiss('Cross click');
	}

	closeModal() : void {
		this.activeModal.close('Close click');
	}

  changePassword() {
    this.userServices.changePassword(this.jwtToken.decodeToken().UserID, 
    this.passwordForm.controls['password'].getRawValue()).subscribe(
      res => {
        if(res.toString()=='200') {
          alert('Password Change Successfully');
          this.passwordForm.reset();
          this.closeModal();
        }
      }
    );
  }

}
