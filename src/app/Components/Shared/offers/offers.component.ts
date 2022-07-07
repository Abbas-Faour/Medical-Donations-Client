import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { QueryResult } from 'src/app/Models/QueryResult';
import { MedicinesService } from 'src/app/Services/medicines.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  private readonly PAGE_SIZE = 8

  result : QueryResult 
  header : string

  constructor(private medicieService : MedicinesService, private toast : ToastService) { }

  isLoading = true


  query: any = {
    search : "",
    category : "offer",
    pageSize: this.PAGE_SIZE
  };

  filter : string = ""

  ngOnInit(): void {
    this.populateOffers() 
  }

  populateOffers(){
    this.medicieService.getRequestedMedicines(this.query).subscribe(res => {
      this.result = res
      if(this.result.totalItems === 0)
      this.header ="There are no available offers"
      this.isLoading = false}
      
      ,err => this.toast.error("Unexpected Error"))
  }

  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending; 
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateOffers();
  }

  onFilterChange(){
      this.query.page = 1;
      this.query.search = this.filter
      this.populateOffers()

  }

  onFilterReset(){

    this.query.page = 1;
    this.query.pageSize = this.PAGE_SIZE
    this.query.search = ""
    this.filter = ""
    this.populateOffers()
  }

  onPageChange(page) {
    this.query.page = page; 
    this.populateOffers();
  }


}
