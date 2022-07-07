import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = localStorage.getItem('user');
        if (user) {
            // logged in so return true
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['user-login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}
