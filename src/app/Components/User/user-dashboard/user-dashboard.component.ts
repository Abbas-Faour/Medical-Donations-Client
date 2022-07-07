import { Component, OnInit } from '@angular/core';
import { faUserGear } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from 'angular-toastify';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  faUserGear = faUserGear

  userEmail : string = this.auth.getUserEmail()

  constructor(private auth : AuthService,private userService : UserService,private toast : ToastService) { }

  requestSent : boolean = false

  currentAddress : any = {}

  profile : any = {}

  ngOnInit(): void {
    this.userService.getUserProfile(this.auth.getUserEmail()).subscribe( res => this.profile = res
      ,err => this.toast.error("Getting user profile"))

    this.userService.getUserAddress(this.auth.getUserEmail()).subscribe(res => this.currentAddress = res
      ,err => this.toast.error("Getting user address"))
  }

  address : any = {
    email: this.userEmail
  }

  changeAddress(){
    this.requestSent = true
    this.userService.changeAddress(this.address).subscribe(res => {
      this.requestSent = false
      this.toast.success("Address Changed Successfully")},
    err => {
      this.requestSent = false
      this.toast.error("Network Error")})
  }

}
