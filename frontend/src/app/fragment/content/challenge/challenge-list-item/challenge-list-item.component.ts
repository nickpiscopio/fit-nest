import { Component, Input } from '@angular/core';
import { Challenge } from '../../../../models/challenge.model';

@Component({
  selector: 'app-challenge-list-item',
  templateUrl: './challenge-list-item.component.html',
  styleUrls: ['./challenge-list-item.component.sass']
})
export class ChallengeListItemComponent {
  @Input() challenge: Challenge;

}
