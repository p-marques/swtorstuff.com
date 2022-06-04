import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'snacks-error',
    templateUrl: './error-snack.component.html',
    styleUrls: ['./error-snack.component.scss']
})
export class ErrorSnackComponent {
    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: string[],
        private _snackRef: MatSnackBarRef<ErrorSnackComponent>) { }

    public close() {
        this._snackRef.dismiss();
    }
}