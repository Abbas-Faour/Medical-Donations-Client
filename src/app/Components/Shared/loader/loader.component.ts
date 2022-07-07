import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  LoadingImage = '../../../../assets/images/Spinner.gif'

  constructor() { }

  ngOnInit(): void {
  }

}
