import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DatabaseAction } from '../../../../enums/database-action.enum';
import { Challenge } from '../../../../models/challenge.model';
import { Route } from '../../../../constants/route.constant';
import { Communication } from '../../../../util/communication.util';
import { Log } from '../../../../util/log.util';

@Component({
  selector: 'app-dialog-edit-challenge',
  templateUrl: './dialog-edit-challenge.component.html',
  styleUrls: ['./dialog-edit-challenge.component.sass']
})
export class DialogEditChallengeComponent {
  challengeForm;

  challengeIndex: number;
  challenge: Challenge;
  tempChallenge: Challenge;

  loading: boolean;
  error: boolean;

  private communication;

  constructor(@Inject(MAT_DIALOG_DATA) data: {
                index: number,
                challenge: Challenge,
              },
              private _http: HttpClient,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<DialogEditChallengeComponent>) {
    this.communication = new Communication(_http);

    this.addFormValidation();
    this.setChallenge(data.index, data.challenge);
  }

  addFormValidation(): void {
    this.challengeForm = this.formBuilder.group({
      name: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required]
    });
  }

  deleteChallenge(): void {
    this.updateChallenge(DatabaseAction.REMOVE);
  }

  saveChallenge(): void {
    if (this.hasChallenge()) {
      return this.updateChallenge(DatabaseAction.EDIT);
    }

    this.updateChallenge(DatabaseAction.ADD);
  }

  updateChallenge(action: DatabaseAction): void {
    if (!this.challengeForm.invalid) {
      this.error = false;
      this.loading = true;

      this.setChallengeFromTemp();

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
        this.communication.delete(Route.API_CHALLENGE, this.challenge, (success, message, data) => {
          callback(success, message);
        });
        break;
      case DatabaseAction.EDIT:
        this.communication.put(Route.API_CHALLENGE, this.challenge, (success, message, data) => {
          callback(success, message);
        });
        break;
      case DatabaseAction.ADD:
        this.communication.post(Route.API_CHALLENGE, this.challenge, (success, message, data) => {
          callback(success, message);
        });
        break;
      default:
        break;
    }
  }

  setChallengeFromTemp(): void {
    this.challenge = this.tempChallenge;
  }

  setChallenge(index: number, challenge: Challenge): void {
    this.challengeIndex = index;
    this.challenge = challenge;

    if (!this.hasChallenge()) {
      this.challenge = new Challenge();
    }

    this.setTempChallengeFromChallenge();
  }

  setTempChallengeFromChallenge() {
    this.tempChallenge = new Challenge();
    this.tempChallenge.setFromObject(this.challenge);
  }

  closeDialog(): void {
    this.dialogRef.close({ index: this.challengeIndex, challenge: this.challenge });
  }

  getDialogTitleKey(): string {
    return this.hasChallenge() ? 'CHALLENGE.EDIT' : 'CHALLENGE.ADD';
  }

  hasChallenge(): boolean {
    return this.challenge !== undefined &&
           this.challenge !== null &&
           this.challenge.name !== undefined &&
           this.challenge.name !== null &&
           this.challenge.name.trim() !== '';
  }

  getName(): string {
    return this.tempChallenge.name;
  }

  setName(name: string): void {
    this.tempChallenge.name = name;
  }

  setStartDate(date: number): void {
    this.tempChallenge.setStartDate(date);
  }

  setEndDate(date: number): void {
    this.tempChallenge.setEndDate(date);
  }

  getStartDate(): string {
    return this.tempChallenge.getStartDateTimeStamp();
  }

  getEndDate(): string {
    return this.tempChallenge.getEndDateTimeStamp();
  }
}
