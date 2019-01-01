import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Route } from '../../../constants/route.constant';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/google/auth.service';
import { Communication } from '../../../util/communication.util';
import { Log } from '../../../util/log.util';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent {
  users: User[] = [];

  private communication: Communication;

  constructor(private _http: HttpClient, private dialogRef: MatDialog) {
    this.communication = new Communication(_http);

    this.getUsers();
  }

  openDialogToEditUser(userIndex: number, user: User): void {
    const userDialog = this.dialogRef.open(DialogEditUserComponent, {
      data: { index: userIndex, user: user }
    });

    userDialog.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  getUsers(): void {
    // TODO: NEED TO IMPLEMENT A REAL SEARCH IN THE UI.
    const body = {
      query: ''
    };

    this.communication.post(Route.API_USER, body, (success, message, data) => {
      if (!success) {
        return Log.error(message);
      }

      this.resetUsers();

      for (const index in data) {
        if (data.hasOwnProperty(index)) {
          const jsonConfig = data[index];
          const user = new User();
          user.setFromJson(jsonConfig);

          this.addUser(user);
        }
      }
    });
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  resetUsers(): void {
    this.users = [];
  }

  isAdmin(): boolean {
    return AuthService.isUserAdmin();
  }
}
