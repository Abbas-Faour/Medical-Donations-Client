import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backend } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getUserProfile(email : string){
    return this.http.get<any>(backend+"/users/profile/"+email)
  }

  getUserAddress(email : string){
    return this.http.get<any>(backend+"/users/address/"+email)
  }

  changeAddress(address : any){
    return this.http.post<any>(backend+"/users/address",address)
  }

  addFeed(feed : any){
    return this.http.post<string>(backend+"/feedbacks",feed)
  }

}
