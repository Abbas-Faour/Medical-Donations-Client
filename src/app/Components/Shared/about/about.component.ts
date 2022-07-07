import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private toast : ToastService,private userService : UserService) { }

  feed : any = {}
  requestSent : boolean = false

  ngOnInit(): void {
  }

  submit(){
    this.requestSent = true
    this.userService.addFeed(this.feed).subscribe(() => {
      this.requestSent = false
      this.toast.warn("Thankyou for your feedback")
    }
    ,err => {
      this.requestSent = false
      this.toast.error(err.error)
    })
    
  }

}
