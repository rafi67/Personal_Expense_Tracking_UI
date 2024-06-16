import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrl: './change-profile.component.scss'
})
export class ChangeProfileComponent implements OnInit {

  activeModal = inject(NgbActiveModal);

  profileForm!: FormGroup;
  file!: File;

  constructor(private formBuilder: FormBuilder, private userServices: UserService
  ) {}

  ngOnInit(): void {
      this.profileForm = this.formBuilder.group({
        profilePicture: ['', Validators.required]
      });
  }
  
  close() : void {
		this.activeModal.dismiss('Cross click');
	}

	closeModal() : void {
		this.activeModal.close('Close click');
	}

  changePicture() : void {
    if(this.file==null) {
      alert('file empty');
      return;
    }
    const formData = new FormData();
    formData.append("file", this.file);
    this.userServices.updateUserImage(formData)
    .subscribe(
      res => {
        if(res.toString()=='200') alert('Successfully changed');
        else alert('failed to change');
        this.profileForm.controls['profilePicture'].reset();
        this.closeModal();
      }
    );  
  }

  Image(event: any) : void {
    this.file = event.target.files[0];
  }


}
