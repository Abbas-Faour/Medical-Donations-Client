import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { AuthService } from 'src/app/Services/auth.service';
import { MedicinesService } from 'src/app/Services/medicines.service';
import {faSortUp, faSortDown, faMagnifyingGlass, faXmark} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-user-medicines-list',
  templateUrl: './user-medicines-list.component.html',
  styleUrls: ['./user-medicines-list.component.css']
})
export class UserMedicinesListComponent implements OnInit {

  faSortUp = faSortUp
  faSortDown = faSortDown

  userMedicines : any = {}

  medicineToDelete : any = {}

  private readonly PAGE_SIZE = 8


  faMagnifyingGlass = faMagnifyingGlass
  faXmark = faXmark

  constructor(
    private auth : AuthService,
    private medicineService : MedicinesService, 
    private toast : ToastService
    ) { }

    query: any = {
      search : "",
      category : "",
      pageSize : this.PAGE_SIZE,
      userEmail : this.auth.getUserEmail()
    };
  
    filter : string = ""

    columns = [
      { title: 'Name', key: 'name', isSortable: true },
      { title: 'Quantity', key: 'quantity', isSortable: true },
      { title: 'Category' },
      { title: 'Date',key: 'addedDate', isSortable: true  },
      { }
    ];


  ngOnInit(): void {
    this.populateList()
  }

  displayModel(m : any){;
    var index = this.userMedicines.items.indexOf(m);
    this.medicineToDelete = this.userMedicines.items[index] 
  }

  removeMedicine(){
    let email = this.auth.getUserEmail()

    let index = this.userMedicines.items.indexOf(this.medicineToDelete);

    let imageUrl = this.medicineToDelete.imageUrl.split('/').pop();


    this.medicineService.deleteMedicine(this.medicineToDelete.id,email).subscribe(res => {
        this.medicineService.deleteImage({fileName : imageUrl}).subscribe(res => {
        this.toast.warn("Item deleted successfully")
        this.userMedicines.items.splice(index,1);
      })
    })
  }

  onFilterChange(){
    this.query.page = 1;
    this.query.search = this.filter
    this.populateList()
    
}

onFilterReset(){
  this.query = {
    page: 1,
    pageSize: this.PAGE_SIZE
  };
  this.filter = ""
  this.populateList()
}

private populateList(){
  this.medicineService.getUserMedicine(this.auth.getUserEmail(),this.query).subscribe(res => {
    this.userMedicines = res
  },err => this.toast.error(err.error))

}
sortBy(columnName) {
  if (this.query.sortBy === columnName) {
    this.query.isSortAscending = !this.query.isSortAscending; 
  } else {
    this.query.sortBy = columnName;
    this.query.isSortAscending = true;
  }
  this.populateList()
}

onPageChange(page) {
  this.query.page = page; 
  this.populateList();
}

}
