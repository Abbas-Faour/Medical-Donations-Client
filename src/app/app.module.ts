import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/Shared/nav-bar/nav-bar.component';
import { RegisterFormComponent } from './Components/Shared/register-form/register-form.component';
import { LoginFormComponent } from './Components/Shared/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './Services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OffersComponent } from './Components/Shared/offers/offers.component'
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { ValidateEqualModule } from 'ng-validate-equal';
import { RequestsComponent } from './Components/Shared/requests/requests.component';
import { MedicineFormComponent } from './Components/User/medicine-form/medicine-form.component';
import { UserMedicinesListComponent } from './Components/User/user-medicines-list/user-medicines-list.component';
import { UserDashboardComponent } from './Components/User/user-dashboard/user-dashboard.component';
import {  AuthInterceptor } from './Services/Intercepters/AuthIntercepter';
import { MedicinesService } from './Services/medicines.service';
import { MedicineDetailsComponent } from './Components/Shared/medicine-details/medicine-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './Components/Shared/pagination/pagination.component';
import { LoaderComponent } from './Components/Shared/loader/loader.component';
import { FooterComponent } from './Components/Shared/footer/footer.component';
import { AboutComponent } from './Components/Shared/about/about.component';
import { UserService } from './Services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RegisterFormComponent,
    LoginFormComponent,
    OffersComponent,
    RequestsComponent,
    MedicineFormComponent,
    UserMedicinesListComponent,
    UserDashboardComponent,
    MedicineDetailsComponent,
    PaginationComponent,
    LoaderComponent,
    FooterComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularToastifyModule,
    ValidateEqualModule,
    FontAwesomeModule,
  ],
  providers: [
    AuthService,
    ToastService,
    MedicinesService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
