import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
    SelectCombatStyleAndDisciplineDialogResultData,
    SelectCombatStyleAndDisciplineDialogSeedData
} from "src/app/core/utility-types/SelectCombatStyleAndDisciplineDialogData";

@Component({
    selector: 'dialog-select-combat-style-and-discipline',
    templateUrl: './dialog-select-combat-style-and-discipline.component.html',
    styleUrls: ["./dialog-select-combat-style-and-discipline.component.scss"]
})
export class DialogSelectCombatStyleAndDiscipline implements OnInit {
    private _combatStyleFormControl = new FormControl({ value: null }, Validators.required);;
    private _disciplineFormControl = new FormControl({ value: null }, Validators.required);

    public form = this._formBuilder.group({ combatStyle: this._combatStyleFormControl, discipline: this._disciplineFormControl });

    get returnData(): SelectCombatStyleAndDisciplineDialogResultData {
        return {
            selectedCombatStyle: this._combatStyleFormControl.value,
            selectedDiscipline: this._disciplineFormControl.value
        }
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: SelectCombatStyleAndDisciplineDialogSeedData,
        private _formBuilder: FormBuilder) {}

    public onSelectedCombatStyleChanged() {
        if (!this.form.value.combatStyle) {
            this._disciplineFormControl.reset();
            this._disciplineFormControl.disable();

            return;
        };

        this._disciplineFormControl.reset();
    }

    public ngOnInit(): void {
        this._combatStyleFormControl.setValue(this.data.selectedCombatStyle);
        this._disciplineFormControl.setValue(this.data.selectedDiscipline);
    }
}