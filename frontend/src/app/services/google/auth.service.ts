import { Injectable } from '@angular/core';
import { Log } from '../../util/log.util';
import { AppGlobals } from './oauth2.global';

declare const gapi: any;

@Injectable()
export class AuthService {
  public static readonly BUTTON_LOGIN_ID = 'google-login-button';

  public static readonly USER_TYPE_ADMIN = 'ADMIN';

  public static readonly GOOGLE_TOKEN = 'token';
  private static readonly GOOGLE_IMAGE = 'image';
  private static readonly GOOGLE_NAME = 'name';
  private static readonly GOOGLE_EMAIL = 'email';
  private static readonly GOOGLE_USER_TYPE = 'user_type';

  private userDetails;
  private email: string;
  private profile;

  public static isUserAdmin() {
    const userType = this.getUserType();
    return userType === this.USER_TYPE_ADMIN;
  }

  public static getToken(): string {
    return localStorage.getItem(AuthService.GOOGLE_TOKEN);
  }

  public static getUserImage() {
    return localStorage.getItem(AuthService.GOOGLE_IMAGE);
  }

  private static getUserType() {
    return localStorage.getItem(AuthService.GOOGLE_USER_TYPE);
  }

  public authenticateUser(callback: Function): void {
    let auth2: any;

    const self = this;

    gapi.load('auth2', function (): void {
      auth2 = gapi.auth2.init({
        client_id: AppGlobals.GOOGLE_CLIENT_ID,
        cookie_policy: 'single_host_origin',
        scope: 'profile email',
        prompt: 'select_account',
      });

      // Login button reference.
      const loginButton: any = document.getElementById(AuthService.BUTTON_LOGIN_ID);

      auth2.attachClickHandler(loginButton, {},
        function (userDetails: any): void {
          self.userDetails = userDetails;
          // Getting profile object
          self.profile = self.userDetails.getBasicProfile();
          self.email = self.profile.getEmail();
          // The details are correct.
          callback(self.profile.getName(), self.email);
        }, function (err: any): void {
          Log.error(err);
        });
    });
  }

  public storeUserInformation(userType: string, callback: Function): void {
    localStorage.setItem(AuthService.GOOGLE_TOKEN, this.userDetails.getAuthResponse().id_token);
    localStorage.setItem(AuthService.GOOGLE_IMAGE, this.profile.getImageUrl());
    localStorage.setItem(AuthService.GOOGLE_NAME, this.profile.getName());
    localStorage.setItem(AuthService.GOOGLE_EMAIL, this.email);
    localStorage.setItem(AuthService.GOOGLE_USER_TYPE, userType);

    callback();
  }
}
