import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Route } from '../../../constants/route.constant';
import { Challenge } from '../../../models/challenge.model';
import { AuthService } from '../../../services/google/auth.service';
import { Communication } from '../../../util/communication.util';
import { Log } from '../../../util/log.util';
import { DialogEditChallengeComponent } from './dialog-edit-challenge/dialog-edit-challenge.component';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.sass']
})
export class ChallengeComponent {
  challenges: Challenge[];

  private communication: Communication;

  constructor(private _http: HttpClient, private dialogRef: MatDialog) {
    this.communication = new Communication(_http);

    this.getChallenges();
  }

  openDialogToAddChallenge(userIndex: number, challenge: Challenge): void {
    const userDialog = this.dialogRef.open(DialogEditChallengeComponent, {
      data: { index: userIndex, challenge: challenge }
    });

    userDialog.afterClosed().subscribe(() => {
      this.getChallenges();
    });
  }

  getChallenges(): void {
    // TODO: NEED TO IMPLEMENT A REAL SEARCH IN THE UI.
    const body = {
      query: ''
    };

    this.communication.post(Route.API_USER, body, (success, message, data) => {
      if (!success) {
        return Log.error(message);
      }

      this.resetChallenges();

      for (const index in data) {
        if (data.hasOwnProperty(index)) {
          const jsonConfig = data[index];
          const challenge = new Challenge();
          challenge.setFromJson(jsonConfig);

          this.addChallenge(challenge);
        }
      }
    });
  }

  addChallenge(challenge: Challenge): void {
    this.challenges.push(challenge);
  }

  resetChallenges(): void {
    this.challenges = [];
  }

  isAllowedToAddChallenge() {
    return AuthService.isUserAdmin();
  }
}
