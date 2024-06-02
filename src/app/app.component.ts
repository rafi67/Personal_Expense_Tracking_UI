import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Incomes } from '../models/income.model';
import { JwtTokenService } from '../services/jwt-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Personal_Expense_Tracking_UI';
  incomeData: Incomes[] = [];

  isLogin: boolean = false;
  isLogout: boolean = false;

  constructor(private jwtService: JwtTokenService, public container: ViewContainerRef, private router: Router) {}

  ngOnInit(): void {
     this.isLogin = !this.jwtService.isTokenExpired();
     this.isLogout = !this.isLogin;
     if(this.isLogin) {
      this.router.navigate(['/Layout']);
     }
     else {
      this.router.navigate(['/Login']);
     }
  }

}
