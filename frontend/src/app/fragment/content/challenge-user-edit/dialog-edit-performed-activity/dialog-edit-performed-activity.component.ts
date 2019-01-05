import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DatabaseAction } from '../../../../enums/database-action.enum';
import { Route } from '../../../../constants/route.constant';
import { PerformedActivity } from '../../../../models/performed-activity.model';
import { AuthService } from '../../../../services/google/auth.service';
import { Communication } from '../../../../util/communication.util';
import { Log } from '../../../../util/log.util';

@Component({
  selector: 'app-dialog-edit-challenge',
  templateUrl: './dialog-edit-performed-activity.component.html',
  styleUrls: ['./dialog-edit-performed-activity.component.sass']
})
export class DialogEditPerformedActivityComponent {
  form;

  challengeId: number;

  performedActivity: PerformedActivity;
  tempPerformedActivity: PerformedActivity;

  loading: boolean;
  error: boolean;

  private communication;

  constructor(@Inject(MAT_DIALOG_DATA) data: {
                challengeId: number,
                performedActivity: PerformedActivity,
              },
              private _http: HttpClient,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<DialogEditPerformedActivityComponent>) {
    this.communication = new Communication(_http);

    this.challengeId = data.challengeId;

    this.addFormValidation();
    this.setPerformedActivity(data.performedActivity);
  }

  addFormValidation(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required]
    });
  }

  deletePerformedActivity(): void {
    this.updatePerformedActivity(DatabaseAction.REMOVE);
  }

  savePerformedActivity(): void {
    if (this.hasPerformedActivity()) {
      return this.updatePerformedActivity(DatabaseAction.EDIT);
    }

    this.updatePerformedActivity(DatabaseAction.ADD);
  }

  updatePerformedActivity(action: DatabaseAction): void {
    if (!this.form.invalid) {
      this.error = false;
      this.loading = true;

      this.setPerformedActivityFromTemp();

      this.getSubscriptionType(action, (success, message) => {
        this.loading = false;

        if (!success) {
          this.error = true;
          return Log.error(message);
        }

        this.closeDialog();
      });
    }
  }

  getSubscriptionType(action: DatabaseAction, callback: Function): void {
    switch (action) {
      case DatabaseAction.REMOVE:
        this.communication.delete(Route.API_CHALLENGE, this.performedActivity, (success, message, data) => {
          callback(success, message);
        });
        break;
      case DatabaseAction.EDIT:
        this.communication.put(Route.API_CHALLENGE, this.performedActivity, (success, message, data) => {
          callback(success, message);
        });
        break;
      case DatabaseAction.ADD:
        this.communication.post(Route.API_CHALLENGE, this.performedActivity, (success, message, data) => {
          callback(success, message);
        });
        break;
      default:
        break;
    }
  }

  setPerformedActivityFromTemp(): void {
    this.performedActivity = this.tempPerformedActivity;
  }

  setPerformedActivity(performedActivity: PerformedActivity): void {
    this.performedActivity = performedActivity;

    if (!this.hasPerformedActivity()) {
      this.performedActivity = this.getNewPerformedActivity();
    }

    this.setTempChallengeFromChallenge();
  }

  setTempChallengeFromChallenge() {
    this.tempPerformedActivity = this.getNewPerformedActivity();
    this.tempPerformedActivity.setFromObject(this.performedActivity);
  }

  getNewPerformedActivity(): PerformedActivity {
    let userEmail = AuthService.getUserEmail();
    return new PerformedActivity(userEmail, this.challengeId);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getDialogTitleKey(): string {
    return this.hasPerformedActivity() ? 'PERFORMED_ACTIVITY.EDIT' : 'PERFORMED_ACTIVITY.ADD';
  }

  hasPerformedActivity(): boolean {
    return this.performedActivity !== undefined &&
           this.performedActivity !== null &&
           this.performedActivity.activity !== null &&
           this.performedActivity.activity !== '';
  }

  // getName(): string {
  //   return this.tempChallenge.name;
  // }
  //
  // setName(name: string): void {
  //   this.tempChallenge.name = name;
  // }
  //
  // setStartDate(date: number): void {
  //   this.tempChallenge.setStartDate(date);
  // }
  //
  // setEndDate(date: number): void {
  //   this.tempChallenge.setEndDate(date);
  // }
  //
  // getStartDate(): string {
  //   return this.tempChallenge.getStartDateTimeStamp();
  // }
  //
  // getEndDate(): string {
  //   return this.tempChallenge.getEndDateTimeStamp();
  // }

  // getActivityPlaceholderKey() {
  //   return 'CHALLENGE.ACTIVITIES';
  // }
}
