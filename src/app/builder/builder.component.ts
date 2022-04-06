import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SwtorCharacter } from '../core/swtor-character';
import { DialogSimpleTextInputComponent } from '../dialogs/dialog-simple-text-input.component';
import { DialogSelectFieldInputComponent } from '../dialogs/dialog-select-field-input.component';
import { CombatStylesEnum } from '../core/combat-styles-enum';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  character: SwtorCharacter = new SwtorCharacter();

  constructor(private titleService: Title,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  public ngOnInit() {
    this.titleService.setTitle("Builder <> SWTOR STUFF");

    this.parseQueryParams();
  }

  public editCharacterName() {
    const dialogRef = this.dialog.open(DialogSimpleTextInputComponent, { data: this.character.name });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.character.name = result;
        this.mergeParamToActivatedRoute({n: result});
      }
    });
  }

  public editCharacterStyle() {
    const dialogRef = this.dialog.open(DialogSelectFieldInputComponent,
      {
        data: {
          options: Object.keys(CombatStylesEnum).filter(v => isNaN(Number(v))),
          selected: this.character.combatStyle,
          label: "Combat Style"
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.character.combatStyle = result;

        this.mergeParamToActivatedRoute({cs: result});
      }
    });
  }

  private parseQueryParams() {
    const snapQueryMap = this.activatedRoute.snapshot.queryParamMap;
    const characterName = snapQueryMap.get('n');

    if (characterName) {
      this.character.name = characterName;
    }

    const combatStyle = Number(snapQueryMap.get('cs'));

    if (combatStyle) {
      this.character.combatStyle = combatStyle;
    }
  }

  private mergeParamToActivatedRoute(param: any) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: param,
        queryParamsHandling: 'merge'
      })
  }
}