import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserData } from '../../../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent implements OnInit {

  activeModal = inject(NgbActiveModal);

  deleteUserForm!: FormGroup;
  userList: UserData [] = [];

  constructor(private router: Router, private userServices: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    
    this.deleteUserForm = this.formBuilder.group({
      userId: '',
    });

    this.deleteUserForm.controls['userId'].setValue('option1');

    this.userServices.getAllUser().subscribe(
      userData => this.userList = userData
    );

  }

  closeModal() : void {
    this.activeModal.close('Close click');
    //this.router.navigate(['/Layout']);
  }

  close() : void {
    this.activeModal.dismiss('Cross click');
    //this.router.navigate(['/Layout']);
  }

  deleteUser() : void {
    var id = this.deleteUserForm.controls['userId'].getRawValue();
    this.userServices.deleteUser(id);
    this.closeModal();
  }

}
