import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-simple-text-input',
    templateUrl: './dialog-simple-text-input.component.html'
  })
export class DialogSimpleTextInputComponent {
    constructor(public dialogRef: MatDialogRef<DialogSimpleTextInputComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}