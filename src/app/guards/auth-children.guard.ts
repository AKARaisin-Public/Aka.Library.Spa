import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthChildrenGuard implements CanActivateChild {

  constructor(private auth: AuthService, private router: Router) { }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.auth.isAuthenticated) {
        // not logged in so redirect to login page with the return url and return false
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
    return true;
  }
}
