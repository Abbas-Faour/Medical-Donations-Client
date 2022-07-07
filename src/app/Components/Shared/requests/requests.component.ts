import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { QueryResult } from 'src/app/Models/QueryResult';
import { MedicinesService } from 'src/app/Services/medicines.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  private readonly PAGE_SIZE = 8

  result : QueryResult 
  header : string

  constructor(private medicieService : MedicinesService, private toast: ToastService) { }
  
  query: any = {
    search : "",
    category : "request",
    pageSize: this.PAGE_SIZE

  };

  isLoading = true

  filter : string = ""

  ngOnInit(): void {
   
    this.populateRequests() 
  }

  populateRequests(){
    this.medicieService.getRequestedMedicines(this.query).subscribe(res => {
      this.result = res
      if(this.result.totalItems === 0)
      this.header ="There are no requests"
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
    this.populateRequests();
  }

  onFilterChange(){

     this.query.page = 1;
      this.query.search = this.filter
      this.populateRequests()

  }

  onFilterReset(){
    this.query.page = 1;
    this.query.pageSize = this.PAGE_SIZE
    this.query.search = ""
    this.filter = ""
    this.populateRequests()
  }

  onPageChange(page) {
    this.query.page = page; 
    this.populateRequests();
  }

}
