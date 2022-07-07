import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  
    isLogged : boolean = this.auth.isLoggedIn();

  constructor(private auth : AuthService, private router : Router) {
    
    let user =localStorage.getItem('user');

    if(user){
      this.auth.AuthenticateUser(JSON.parse(user))
      this.isLogged = true
    }

   }

    ngOnInit(): void {

      this.auth.isLoggedInSubject.subscribe(status => {
        this.isLogged = status; // your emitted value is received here.
      }) 
  }

  getRole(){
    return this.auth.getUserRole()
  }

  getUser(){
    return this.auth.getUserEmail()
  }

  logout(){
    this.auth.RevokeToken({token: this.auth.getRefreshToken()}).subscribe(res => {
      this.auth.Logout()
      this.router.navigate(['/requests']).then(() => window.location.reload())
    });
  }

}
