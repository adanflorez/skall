import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem(environment.keyToken);
    if (token) {
      return true;
    } else {
      localStorage.removeItem(environment.keyToken);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
