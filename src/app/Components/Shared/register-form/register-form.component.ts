import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  user : any = {}

  requestSent : boolean = false


  constructor(private auth : AuthService, private router : Router, private toast : ToastService) { }

  ngOnInit(): void {
  }

  submit()
  {
    this.requestSent = true
    this.auth.register(this.user).subscribe(res => {
      this.toast.success(res.status)
      this.requestSent = false
      this.router.navigate(['user-login'])
    },err => {
      this.toast.error(err.error)
      this.requestSent = false})
  }

}
