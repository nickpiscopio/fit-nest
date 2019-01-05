import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { UserDatabaseColumns } from '../../../constants/database-columns/authorization-columns.constant';
import { Route } from '../../../constants/route.constant';
import { Dialog } from '../../../models/dialog.model';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/google/auth.service';
import { AppGlobals } from '../../../services/google/oauth2.global';
import { Communication } from '../../../util/communication.util';
import { Log } from '../../../util/log.util';
import { MessageUtility } from '../../../util/message.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  communication: Communication;

  messageUtility: MessageUtility;

  private subscription: any;

  constructor(private _googleAuth: AuthService,
              private _http: HttpClient,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute) {
    this.communication = new Communication(_http);

    this.messageUtility = new MessageUtility(dialog);
  }

  ngOnInit(): void {
    AppGlobals.GOOGLE_CLIENT_ID = '203892154953-b5o7novr56sro1fglqno4snp15j4mt43.apps.googleusercontent.com';

    this.subscribeToRouter();
  }

  ngAfterViewInit(): void {
    this.authenticateUserWithGoogle();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscribeToRouter(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      const error = params[Route.PARAM_ERROR];
      if (error) {
        this.openErrorDialog();
      }
    });
  }

  openErrorDialog(): void {
    this.messageUtility.openDialog(new Dialog("LOGIN.ERROR.TITLE", "LOGIN.ERROR.MESSAGE", null, "DIALOG.OK"));
  }

  authenticateUserWithGoogle(): void {
    this._googleAuth.authenticateUser((name, email) => {
      this.isUserAuthorized(name, email);
    });
  }

  isUserAuthorized(name: string, email: string): void {
    const user = this.getNewUser(name, email);
    const route = Route.API_USER_AUTHORIZE_VERIFY;
    const body = user;

    this.communication.post(route, body, (success, message, data) => {
      if (!success) {
        Log.error('Error logging into the platform.');

        return this.changeUrlToLoginError();
      }

      const resultIndex = 0;
      let results = data[resultIndex];
      let userGroup = results[UserDatabaseColumns.USER_GROUP];
      this._googleAuth.storeUserInformation(userGroup, () => {
        this.changeUrlToApplication();
      });
    });
  }

  getNewUser(name: string, email: string): User {
    const user = new User();
    user.name = name;
    user.setEmail(email);
    return user;
  }

  changeUrlToApplication(): void {
    window.location.href = Route.CHALLENGE;
  }

  changeUrlToLoginError(): void {
    window.location.href = Route.LOGIN_ERROR;
  }

  getLoginButtonId(): string {
    return AuthService.BUTTON_LOGIN_ID;
  }
}
