import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { backend } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated : boolean = false
  isLoggedInSubject: Subject<boolean> = new Subject();
  private userRole : string = ""
  private userEmail : string = ""
  private accessToken : string = ""
  private refreshToken : string = ""



  constructor(private http : HttpClient) { }

  public login(user : any)
  {
    return this.http.post<any>(backend+"/auth/login",user);
  }

  public register(user : any)
  {
    return this.http.post<any>(backend+"/auth/register",user);
  }

  public getUserRole()
  {
    return this.userRole
  }

  public getUserEmail()
  {
    return this.userEmail
  }
  public getAccessToken()
  {
    return this.accessToken
  }

  public getRefreshToken()
  {
    return this.refreshToken
  }

  public isLoggedIn()
  {
    return this.isAuthenticated;
  }

  public AuthenticateUser(response: any){

    this.isAuthenticated = true;
    this.isLoggedInSubject.next(this.isAuthenticated);
      this.userEmail = response.email;
      this.userRole = response.roles[0]
      this.accessToken = response.token;
      this.refreshToken = response.refreshToken;
      localStorage.setItem('user',JSON.stringify(response));

  }

  public RefreshToken(token : any){
    return this.http.post(backend+"/auth/refreshToken",token)
  }

  public RevokeToken(token : any){
    return this.http.post(backend+"/auth/revokeToken",token)
  }


  public Logout(){
    this.isAuthenticated = false;
    this.isLoggedInSubject.next(this.isAuthenticated);
    this.userEmail = "";
    this.userRole = ""
    this.accessToken = "";
    this.refreshToken = ""
    localStorage.clear();
  }
}
