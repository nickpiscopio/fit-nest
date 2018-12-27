import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Route } from '../../constants/route.constant';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.hasAuthToken()) {

      this.routeUserToLogin();

      return false;
    }

    return true;
  }

  routeUserToLogin(): void {
    this.router.navigate([Route.LOGIN]);
  }

  hasAuthToken(): boolean {
    const token = AuthService.getToken();
    return token !== undefined && token !== null;
  }
}
