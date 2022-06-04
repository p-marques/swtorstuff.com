import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogSimpleTextInputComponent } from '../dialogs/simple-text-input/dialog-simple-text-input.component';
import { DialogSelectCombatStyleAndDiscipline } from '../dialogs/select-combat-style-and-discipline/dialog-select-combat-style-and-discipline.component';
import { ErrorSnackComponent } from '../custom-snacks/error-snack/error-snack.component';

import { BuilderService } from './services/builder.service';
import { FactionsEnum } from '../core/FactionsEnum';
import { RoleEnum } from '../core/RoleEnum';
import {
  SelectCombatStyleAndDisciplineDialogResultData,
  SelectCombatStyleAndDisciplineDialogSeedData
} from '../core/utility-types/SelectCombatStyleAndDisciplineDialogData';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  private _disciplineFormControl: FormControl = new FormControl({ value: null, disabled: true }, Validators.required);

  public newCharacterForm = this._formBuilder.group({
    name: new FormControl(null, Validators.required),
    combatStyle: new FormControl(null, Validators.required),
    discipline: this._disciplineFormControl,
    faction: new FormControl(0, Validators.required)
  });

  get roleForSelectedDiscipline(): RoleEnum | undefined {
    if (this.builder.character.name) return this.builder.character.discipline?.role;
    else return this.newCharacterForm.value.discipline?.role;
  }

  get currentFactionSelected(): FactionsEnum {
    if (this.builder.character.name) return this.builder.character.faction;
    else return this.newCharacterForm.value.faction;
  }

  constructor(
    public builder: BuilderService,
    private _formBuilder: FormBuilder,
    private _titleService: Title,
    private _dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar) {
  }

  public ngOnInit() {
    this._titleService.setTitle("Builder <> SWTOR STUFF");

    if (this.builder.character.name) {
      this.rebuildRouteParams();
      return;
    }

    this.builder.fetchData().then(() => this.parseQueryParams());
  }

  public onSelectedCombatStyleChanged() {
    if (!this.newCharacterForm.value.combatStyle) {
      this._disciplineFormControl.reset();
      this._disciplineFormControl.disable();

      return;
    };

    if (!this._disciplineFormControl.enabled)
      this._disciplineFormControl.enable();

    this._disciplineFormControl.reset();
  }

  public onSubmitNewCharacter(): void {
    if (this.newCharacterForm.value.name.trim().length < 3) return;

    this.builder.character.name = this.newCharacterForm.value.name;
    this.builder.character.combatStyle = this.newCharacterForm.value.combatStyle;
    this.builder.character.discipline = this.newCharacterForm.value.discipline;
    this.builder.character.faction = this.newCharacterForm.value.faction;

    this.rebuildRouteParams();
  }

  public editCharacterName(): void {
    const dialogRef = this._dialog.open(DialogSimpleTextInputComponent, {
      data: {
        value: this.builder.character.name,
        label: 'Name',
        validators: [Validators.minLength(3), Validators.maxLength(20)]
      },
      minHeight: '10vh',
      minWidth: '33vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.builder.character.name = result;
        this.patchRouteParams({n: result});
      }
    });
  }

  public editCharacterCombatStyleAndDiscipline(): void {
    if (!this.builder.combatStyles || !this.builder.character.combatStyle ||
      !this.builder.character.discipline) return;

    const dialogData: SelectCombatStyleAndDisciplineDialogSeedData = {
      combatStyles: this.builder.combatStyles,
      selectedCombatStyle: this.builder.character.combatStyle,
      selectedDiscipline: this.builder.character.discipline
    };

    const dialogRef = this._dialog.open(DialogSelectCombatStyleAndDiscipline, {
      data: dialogData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: SelectCombatStyleAndDisciplineDialogResultData) => {
      if (result && result.selectedCombatStyle && result.selectedDiscipline) {
        if (result.selectedDiscipline.combatStyleId != result.selectedCombatStyle.id) {
          console.error("Combat style and discipline selection dialog returned bad data.");
          return;
        }

        this.builder.character.combatStyle = result.selectedCombatStyle;
        this.builder.character.discipline = result.selectedDiscipline;
        this.patchRouteParams({ cs: result.selectedCombatStyle.id, d: result.selectedDiscipline.id });
      }
    });
  }

  private parseQueryParams(): void {
    const errors: string[] = new Array();

    if (this._activatedRoute.snapshot.queryParamMap.keys.length === 0) return;

    const characterName = this.parseMandatoryParam('n', 'Name',
      (parsedValue: string) => {
        if (parsedValue.length < 3 || parsedValue.length > 20)
          return undefined;
        else
          return parsedValue;
      }, errors);

    if (!characterName) {
      this.notifyErrors(errors);
      return;
    }

    const combatStyle = this.parseMandatoryParam('cs', 'Combat Style', this.builder.getCombatStyleById, errors);
    let discipline = this.parseMandatoryParam('d', 'Discipline', this.builder.getDisciplineById, errors);

    if (combatStyle && discipline && discipline.combatStyleId !== combatStyle.id) {
      errors.push(`Discipline '${discipline.name}' does not belong to '${combatStyle.name}'.`);
      discipline = undefined;
    }

    const faction = this.parseMandatoryParam('f', 'Faction',
      (parsedValue: string) => {
        const f: FactionsEnum = Number(parsedValue);

        if (isNaN(f) || f < FactionsEnum.Republic || f > FactionsEnum.Empire)
          return undefined;

        return f;
      }, errors);

    if (!combatStyle || !discipline || faction == null) {
      this.notifyErrors(errors)
      return;
    }

    this.builder.character.name = characterName;
    this.builder.character.combatStyle = combatStyle;
    this.builder.character.discipline = discipline;
    this.builder.character.faction = faction;
  }

  // Returns T if successful, null if param not existent, undefined if no id match
  private parseMandatoryParam<T>(
    paramId: string,
    paramName: string,
    lookup: (parsedValue: string) => T | undefined,
    errorMsgs: string[]): T | undefined | null {
    const value = this._activatedRoute.snapshot.queryParamMap.get(paramId);

    if (value === null) {
      errorMsgs.push(`${paramName} parameter (${paramId}) is mandatory for character loading.`);
      return null;
    }

    const parsed = lookup(value);

    if (parsed === undefined) {
      errorMsgs.push(`'${value}' from ${paramName} parameter (${paramId}) is unacceptable.`);
      return undefined;
    }

    return parsed;
  }

  private rebuildRouteParams(): void {
    this.patchRouteParams({
      n: this.builder.character.name,
      f: this.builder.character.faction,
      cs: this.builder.character.combatStyle?.id,
      d: this.builder.character.discipline?.id
    });
  }

  private patchRouteParams(params: Params): void {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }

  private notifyErrors(msgs: string[] | string): void {
    this._snackBar.openFromComponent(ErrorSnackComponent, {
      data: msgs
    });
  }
}