import { Component, OnInit } from '@angular/core';
import {faGithub, faLinkedin, faInstagram, faFacebook} from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faGithub = faGithub
  faLinkedin = faLinkedin
  faInstagram = faInstagram
  faFacebook = faFacebook

  constructor() { }

  ngOnInit(): void {
  }

}
