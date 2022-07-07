import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backend } from 'src/environments/environment';
import { MedicineToReturn } from '../Models/MedicineToReturn';
import { QueryResult } from '../Models/QueryResult';


@Injectable({
  providedIn: 'root'
})
export class MedicinesService {

  constructor(private http : HttpClient) { }

  getCategories(){
    return this.http.get<any>(backend+"/categories")
  }

  getRequestedMedicines(filter : any){
    return this.http.get<QueryResult>(backend+"/medicines" + '?' + this.toQueryString(filter))
  }

  getOfferdMedicines(filter : any){
    return this.http.get<QueryResult>(backend+"/medicines"+ '?' + this.toQueryString(filter))
  }

  getMedicineById(id : number){
    return this.http.get<MedicineToReturn>(backend+"/medicines/"+id)
  }

  getUserMedicine(email : String,filter : any){
    return this.http.get<QueryResult>(backend+"/medicines/user/"+email + '?' + this.toQueryString(filter))
  }

  addMedicine(medicine : any){
    return this.http.post(backend+"/medicines",medicine);
  }

  editMedicine(medicine: any, id : number){
    return this.http.put<any>(backend+"/medicines/"+id,medicine)
  }

  deleteMedicine(id : number,email : string){
    return this.http.delete(backend+"/medicines/"+email+"/"+id)
  }

  uploadImage(file : any){
    var formData = new FormData()
    formData.append('file',file);
    return this.http.post<any>(backend+"/photos",formData)
  }

  deleteImage(photo : any){
    return this.http.post<any>(backend+"/photos/delete",photo)
  }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined) 
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    return parts.join('&');
  }
}
