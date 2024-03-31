import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { LayoutComponent } from './component/layout/layout.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { IncomeComponent } from './component/income/income.component';
import { ExpenseComponent } from './component/expense/expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavbarComponent,
    IncomeComponent,
    ExpenseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(), provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
