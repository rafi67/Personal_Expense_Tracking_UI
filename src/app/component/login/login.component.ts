import { Component, OnInit } from '@angular/core';
import { Login } from '../../../models/login.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { JwtTokenService } from '../../../services/jwt-token.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  login: Login = {
    userNameOrEmail: '',
    password: ''
  };

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authenticationServices: AuthenticationService, private jwtTokenServices: JwtTokenService,
    private router: Router, private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        userNameOrEmail: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  Login(): void {

    this.login.userNameOrEmail = this.loginForm.controls['userNameOrEmail'].getRawValue();
    this.login.password = this.loginForm.controls['password'].getRawValue();

    this.loginForm.reset();

    this.authenticationServices.login(this.login).subscribe(
      token => {
        if(token.message==="User not found") {
          alert("Wrong user name or email or passwrod");
        }
        else {
          this.jwtTokenServices.setToken(token.token);
          this.appComponent.isLogin = !this.jwtTokenServices.isTokenExpired();
          this.router.navigate(['/Navbar']);
        }
      }
    );
  }

}
