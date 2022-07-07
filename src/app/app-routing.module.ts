import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/Shared/about/about.component';
import { LoginFormComponent } from './Components/Shared/login-form/login-form.component';
import { MedicineDetailsComponent } from './Components/Shared/medicine-details/medicine-details.component';
import { OffersComponent } from './Components/Shared/offers/offers.component';
import { RegisterFormComponent } from './Components/Shared/register-form/register-form.component';
import { RequestsComponent } from './Components/Shared/requests/requests.component';
import { MedicineFormComponent } from './Components/User/medicine-form/medicine-form.component';
import { UserDashboardComponent } from './Components/User/user-dashboard/user-dashboard.component';
import { UserMedicinesListComponent } from './Components/User/user-medicines-list/user-medicines-list.component';
import { AuthGuard } from './Services/auth.guard';

const routes: Routes = [
  {path: 'user-register', component : RegisterFormComponent},
  {path: 'user-login', component : LoginFormComponent},
  {path: 'offers', component : OffersComponent},
  {path: 'requests', component : RequestsComponent},
  {path: 'about', component : AboutComponent},
  {path: 'medicine-details/:id', component: MedicineDetailsComponent},

  // authgaurd
  {path: 'user/medicine-form', component : MedicineFormComponent, canActivate: [AuthGuard]},
  {path: 'user/profile', component : UserDashboardComponent, canActivate: [AuthGuard]},
  {path: 'user/medicine-form/:id', component: MedicineFormComponent, canActivate: [AuthGuard]},
  {path: 'user/medicines-list', component : UserMedicinesListComponent, canActivate: [AuthGuard]},

  {path: '**', component : RequestsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
