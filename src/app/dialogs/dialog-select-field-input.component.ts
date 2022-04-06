import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-select-field-input',
    templateUrl: './dialog-select-field-input.component.html'
  })
export class DialogSelectFieldInputComponent {
    selected?: any;

    constructor(public dialogRef: MatDialogRef<DialogSelectFieldInputComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { options: any[], selected: any, label: string }) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}