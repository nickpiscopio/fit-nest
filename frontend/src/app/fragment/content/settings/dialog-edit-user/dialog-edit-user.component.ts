import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Route } from '../../../../constants/route.constant';
import { UserGroup } from '../../../../constants/user-group.constant';
import { DatabaseAction } from '../../../../enums/database-action.enum';
import { User } from '../../../../models/user.model';
import { Communication } from '../../../../util/communication.util';
import { Log } from '../../../../util/log.util';

@Component({
  selector: 'app-bottom-sheet-edit-config',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.sass']
})
export class DialogEditUserComponent {
  userForm: FormGroup;

  userIndex: number;
  user: User;
  tempUser: User;

  loading: boolean;
  error: boolean;

  private communication;

  constructor(@Inject(MAT_DIALOG_DATA) data: {
                index: number,
                user: User,
              },
              private _http: HttpClient,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<DialogEditUserComponent>) {
    this.communication = new Communication(_http);

    this.addFormValidation();
    this.setUser(data.index, data.user);
  }

  addFormValidation(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      userGroup: ['', Validators.required]
    });
  }

  removeUser(): void {
    this.updateUserAuthorization(DatabaseAction.REMOVE);
  }

  saveUser(): void {
    if (this.hasUser()) {
      return this.updateUserAuthorization(DatabaseAction.EDIT);
    }

    this.updateUserAuthorization(DatabaseAction.ADD);
  }

  updateUserAuthorization(authorization: DatabaseAction): void {
    if (!this.userForm.invalid) {
      this.error = false;
      this.loading = true;

      this.setUserFromTemp();

      this.getSubscriptionType(authorization, (success, message) => {
        this.loading = false;

        if (!success) {
          this.error = true;
          return Log.error(message);
        }

        this.closeDialog();
      });
    }
  }

  getSubscriptionType(authorization: DatabaseAction, callback: Function): void {
    switch (authorization) {
      case DatabaseAction.REMOVE:
        this.communication.delete(Route.API_USER_AUTHORIZE, this.user, (success, message, data) => {
          callback(success, message);
        });
        break;
      case DatabaseAction.EDIT:
        this.communication.put(Route.API_USER_AUTHORIZE, this.user, (success, message, data) => {
          callback(success, message);
        });
        break;
      case DatabaseAction.ADD:
        this.communication.post(Route.API_USER_AUTHORIZE, this.user, (success, message, data) => {
          callback(success, message);
        });
        break;
      default:
        break;
    }
  }

  setUserFromTemp(): void {
    this.user = this.tempUser;
  }

  setUser(index: number, user: User): void {
    this.userIndex = index;
    this.user = user;

    if (!this.hasUser()) {
      this.user = new User();
    }

    this.setTempUserFromUser();
  }

  setTempUserFromUser(): void {
    this.tempUser = new User();
    this.tempUser.setFromObject(this.user);
  }

  closeDialog(): void {
    this.dialogRef.close({ transformationIndex: this.userIndex, transformation: this.user });
  }

  getDialogTitleKey(): string {
    return this.hasUser() ? 'SETTINGS.AUTHORIZATION.ADD' : 'SETTINGS.AUTHORIZATION.EDIT';
  }

  hasUser(): boolean {
    return this.user !== undefined &&
           this.user !== null &&
           this.user.name !== undefined &&
           this.user.name !== null &&
           this.user.name.trim() !== '';
  }

  getUserGroups(): String[] {
    return UserGroup.GROUPS;
  }

  getName(): string {
    return this.tempUser.name;
  }

  setName(name: string): void {
    this.tempUser.name = name;
  }

  setEmail(email: string): void {
    this.tempUser.setEmail(email);
  }

  getEmail(): string {
    return this.tempUser.getEmail();
  }

  setUserGroup(group: any): void {
    this.tempUser.userGroup = group;
  }

  getUserGroup() {
    return this.tempUser.userGroup;
  }
}
