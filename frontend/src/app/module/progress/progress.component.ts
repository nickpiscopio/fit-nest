import { Component, Input } from '@angular/core';
import { CssClass } from '../../constants/class.constant';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.sass']
})
export class ProgressComponent {
  @Input() showProgress: boolean;
  @Input() center: boolean;

  strokeWidth = 2;
  diameter = 22;

  getProgressBarClass(): string {
    return this.center ? CssClass.CENTER : '';
  }
}
