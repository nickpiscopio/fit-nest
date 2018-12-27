import { Dialog } from '../../models/dialog.model';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent {
  dialog: Dialog;

  constructor(@Inject(MAT_DIALOG_DATA) data: Dialog) {
    this.dialog = data;
  }

  showMessage() {
    const message = this.dialog.messageKey;
    return message !== undefined && message !== null && message !== '';
  }

  showNegativeButton() {
    const negativeButton = this.dialog.negativeButtonKey;
    return negativeButton !== undefined && negativeButton !== null && negativeButton !== '';
  }

  showPositiveButton() {
    const positiveButton = this.dialog.positiveButtonKey;
    return positiveButton !== undefined && positiveButton !== null && positiveButton !== '';
  }
}
