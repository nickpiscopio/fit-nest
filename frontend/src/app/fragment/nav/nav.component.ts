import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '../../constants/route.constant';
import { AuthService } from '../../services/google/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent {
  @Input() showNavButtons = true;

  constructor(private router: Router) { }

  logout() {
    localStorage.clear();

    this.router.navigate([Route.LOGIN]);
  }

  getChallengeRoute() {
    return Route.ROOT + Route.CHALLENGE;
  }

  getSettingsRoute() {
    return Route.ROOT + Route.SETTINGS;
  }

  getUserProfileImage() {
    return AuthService.getUserImage();
  }
}
