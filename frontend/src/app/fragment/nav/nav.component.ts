import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '../../constants/route.constant';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent {
  @Input() showNavButtons = true;

  constructor(private router: Router) { }

  getChallengeRoute() {
    return Route.ROOT + Route.CHALLENGE;
  }

  getSettingsRoute() {
    return Route.ROOT + Route.SETTINGS;
  }

  getUserProfileImage() {
    return '';
  }

  showAdminIcon() {
    return true;
    // return AuthService.isUserAdmin() || AuthService.isUserRootAdmin();
  }

  logout() {
    localStorage.clear();

    this.router.navigate([Route.LOGIN]);
  }
}
