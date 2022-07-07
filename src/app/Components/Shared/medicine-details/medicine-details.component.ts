import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { MedicineToReturn } from 'src/app/Models/MedicineToReturn';
import { MedicinesService } from 'src/app/Services/medicines.service';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.css']
})
export class MedicineDetailsComponent implements OnInit {

  id: number
  medicine : MedicineToReturn

  constructor(
    private medicineService : MedicinesService,
    private toastService: ToastService,
    private route : ActivatedRoute,
  ) { 
      // get the id from the url
      this.route.params.subscribe(res => this.id = res['id'])
  }

  ngOnInit(): void {
    this.medicineService.getMedicineById(this.id).subscribe(
      res => this.medicine = res
      ,err => this.toastService.error("No Network connection"))
  }

}
