import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ChallengeAction } from '../../../../enums/challenge.enum';
import { Challenge } from '../../../../models/challenge.model';
import { Route } from '../../../../constants/route.constant';
import { Communication } from '../../../../util/communication.util';
import { Log } from '../../../../util/log.util';

const FIELD_NAME = 'name';
const FIELD_EMAIL = 'email';

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

    this.tempChallenge = new Challenge();

    this.addFormValidation();
    this.setChallenge(data.index, data.challenge);
    this.setChallengeForm();
  }

  addFormValidation(): void {
    this.challengeForm = this.formBuilder.group({
      name: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required]
    });
  }

  deleteChallenge(): void {
    this.updateChallenge(ChallengeAction.REMOVE);
  }

  saveChallenge(): void {
    if (this.hasChallenge()) {
      return this.updateChallenge(ChallengeAction.EDIT);
    }

    this.updateChallenge(ChallengeAction.ADD);
  }

  updateChallenge(action: ChallengeAction): void {
    if (!this.challengeForm.invalid) {
      this.error = false;
      this.loading = true;

      this.setChallengeFromForm();

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

  getSubscriptionType(action: ChallengeAction, callback: Function): void {
    switch (action) {
      case ChallengeAction.REMOVE:
        this.communication.delete(Route.API_USER_AUTHORIZE, this.challenge, (success, message, data) => {
          callback(success, message);
        });
        break;
      case ChallengeAction.EDIT:
        this.communication.put(Route.API_USER_AUTHORIZE, this.challenge, (success, message, data) => {
          callback(success, message);
        });
        break;
      case ChallengeAction.ADD:
        this.communication.post(Route.API_USER_AUTHORIZE, this.challenge, (success, message, data) => {
          callback(success, message);
        });
        break;
      default:
        break;
    }
  }

  setChallengeFromForm(): void {
    this.challenge.name = this.getNameField().value;
    // this.challenge.setEmail(this.getEmailField().value);
  }

  setChallenge(index: number, challenge: Challenge): void {
    this.challengeIndex = index;
    this.challenge = challenge;

    if (!this.hasChallenge()) {
      this.challenge = new Challenge();
    }
  }

  setChallengeForm(): void {
    this.getNameField().setValue(this.challenge.name);
    // this.getEmailField().setValue(this.challenge.getEmail());
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

  getNameField(): AbstractControl {
    return this.challengeForm.get(FIELD_NAME);
  }

  getEmailField(): AbstractControl {
    return this.challengeForm.get(FIELD_EMAIL);
  }
}
