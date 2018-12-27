import { Dialog } from '../models/dialog.model';
import { DialogComponent } from '../module/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

export class MessageUtility {
  constructor(private dialogRef: MatDialog) { }

  openDialog(dialog: Dialog) {
    return this.dialogRef.open(DialogComponent, {
      data: dialog
    });
  }
}
