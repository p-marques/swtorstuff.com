import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dialog-simple-text-input',
    templateUrl: './dialog-simple-text-input.component.html',
    styleUrls: ['./dialog-simple-text-input.component.scss']
  })
export class DialogSimpleTextInputComponent {
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { value: string, label: string, validators: Validators },
    private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({ textValue: new FormControl(this.data.value, this.data.validators) });
  }
}