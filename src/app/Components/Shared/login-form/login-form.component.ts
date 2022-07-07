import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  user : any = {}

  requestSent : boolean = false

  constructor(private auth : AuthService, private router : Router,
    private toast: ToastService) { }

  ngOnInit(): void {
  }

  submit()
  {
      this.requestSent = true
      this.auth.login(this.user).subscribe(res => {
        this.auth.AuthenticateUser(res)
        this.requestSent = false
        this.router.navigate(['user/profile'])

      }, err => {
        this.toast.error(err.error)
        this.requestSent = false
      })
  }

}
