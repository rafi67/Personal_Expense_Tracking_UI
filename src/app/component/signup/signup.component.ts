import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { JwtTokenService } from '../../../services/jwt-token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  selectedFile!: File;
  signupForm!: FormGroup
  userData: User = {
    userID: '',
    firstName: '',
    lastName: '',
    gender: '',
    userName: '',
    email: '',
    password: '',
    userPhoto: '',
    userRole: ''
  };

  constructor(private formBuilder: FormBuilder, private router: Router, private authServices: AuthenticationService,
    private jwtTokenServices: JwtTokenService
  ) {}

  ngOnInit(): void {
      this.signupForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        userName: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        email: ['', Validators.required],
        userPhoto: ['', Validators.required],
      });
      
      this.signupForm.controls['gender'].setValue('option1');
  }

  Signup() : void {
    if(this.signupForm.controls['password'].getRawValue()!==this.signupForm.controls['confirmPassword'].getRawValue()) {
      this.signupForm.reset();
      this.signupForm.controls['gender'].setValue('option1');
      alert("Password don't matched");
      return;
    }

    this.userData.userID = '0';
    this.userData.firstName  = this.signupForm.controls['firstName'].getRawValue();
    this.userData.lastName = this.signupForm.controls['lastName'].getRawValue();
    this.userData.gender = this.signupForm.controls['gender'].getRawValue();
    this.userData.userName = this.signupForm.controls['userName'].getRawValue();
    this.userData.password = this.signupForm.controls['password'].getRawValue();
    this.userData.email = this.signupForm.controls['email'].getRawValue();
    this.userData.userRole = 'user';
    this.authServices.signup(this.userData).subscribe(
      res1 => {  
        this.jwtTokenServices.setToken(res1.token);
        if(this.selectedFile!=null) {
          const formData = new FormData();
          formData.append("image", this.selectedFile);
          this.authServices.uploadImage(formData).subscribe(
            res => {
              if(res.toString()=='200') alert(res1.message);
              this.signupForm.reset();
              this.signupForm.controls['gender'].setValue('option1');
              this.router.navigate(['/Navbar/DashBoard']);
            }
          );
        }
        else alert('File is empty');
      }
    );

  }
  
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

}
