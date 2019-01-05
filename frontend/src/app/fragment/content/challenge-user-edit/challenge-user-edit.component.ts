import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Route } from '../../../constants/route.constant';
import { PerformedActivity } from '../../../models/performed-activity.model';
import { DialogEditPerformedActivityComponent } from './dialog-edit-performed-activity/dialog-edit-performed-activity.component';

@Component({
  selector: 'app-challenge-user-edit',
  templateUrl: './challenge-user-edit.component.html',
  styleUrls: ['./challenge-user-edit.component.sass']
})
export class ChallengeUserEditComponent {
  challengeId: string;

  performedActivites: PerformedActivity[];

  constructor(private _http: HttpClient, private dialogRef: MatDialog, private route: ActivatedRoute) {
    this.setChallengeId();
  }

  setChallengeId(): void {
    this.challengeId = this.route.snapshot.paramMap.get(Route.PARAM_CHALLENGE_ID);
  }

  openDialogToAddPerformedActivity(performedActivity: PerformedActivity): void {
    const userDialog = this.dialogRef.open(DialogEditPerformedActivityComponent, {
      data: {
        challengeId: this.challengeId,
        performedActivity: performedActivity
      }
    });

    userDialog.afterClosed().subscribe(() => {
      this.getPerformedActivities();
    });
  }

  getPerformedActivities() {

  }
}
