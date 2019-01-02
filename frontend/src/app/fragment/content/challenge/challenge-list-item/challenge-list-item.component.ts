import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Challenge } from '../../../../models/challenge.model';
import { AuthService } from '../../../../services/google/auth.service';

@Component({
  selector: 'app-challenge-list-item',
  templateUrl: './challenge-list-item.component.html',
  styleUrls: ['./challenge-list-item.component.sass']
})
export class ChallengeListItemComponent {
  @Input() challenge: Challenge;

  @Output() adminEditChallenge = new EventEmitter<Challenge>();
  @Output() userEditChallenge = new EventEmitter<Challenge>();

  adminEditChallengeClicked(): void {
    this.adminEditChallenge.emit(this.challenge);
  }

  userEditChallengeClicked(): void {
    this.userEditChallenge.emit(this.challenge);
  }

  isAbleToEdit(): boolean {
    return AuthService.isUserAdmin();
  }
}
