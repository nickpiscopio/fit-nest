import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Route } from '../../../constants/route.constant';

@Component({
  selector: 'app-challenge-user-edit',
  templateUrl: './challenge-user-edit.component.html',
  styleUrls: ['./challenge-user-edit.component.sass']
})
export class ChallengeUserEditComponent {

  id: string;

  constructor(private route: ActivatedRoute) {
    this.getChallengeId();
  }

  getChallengeId(): void {
    this.id = this.route.snapshot.paramMap.get(Route.PARAM_CHALLENGE_ID);
  }
}
