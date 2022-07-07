import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, map, switchMap, take} from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private authService: AuthService, private router : Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {

    let authReq = req;
    const token = this.authService.getAccessToken();
    if (token != null) {
      authReq = authReq.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
        })
    }

    return next.handle(authReq).pipe(
      catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/login')  && error.status === 401) {
        return this.handle401Error(authReq, next);
      }
      return throwError(error);
    }));
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const refreshToken = this.authService.getRefreshToken();
      if (refreshToken)
        return this.authService.RefreshToken({token: refreshToken}).pipe(

          switchMap((res: any) => {
            this.isRefreshing = false;
            this.authService.AuthenticateUser(res)
            this.refreshTokenSubject.next(this.authService.getAccessToken());
            
            return next.handle(
              request = request.clone({
                headers: request.headers.set("Authorization", "Bearer " + this.authService.getAccessToken())})
            );
          }),
          catchError(() => {
            this.isRefreshing = false;
            this.authService.Logout(); 
            this.router.navigate(['user-login']).then(() => window.location.reload())
             return throwError("Session Expired");
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(
        request = request.clone({
          headers: request.headers.set("Authorization", "Bearer " + token)})
        ))
    );
  }
}