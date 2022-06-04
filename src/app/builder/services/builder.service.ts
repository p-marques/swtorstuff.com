import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CombatStyle } from 'src/app/core/CombatStyle';
import { Discipline } from 'src/app/core/Discipline';
import { IdNamePair } from 'src/app/core/IdNamePair';
import { FactionsEnum } from '../../core/FactionsEnum';
import { SwtorCharacter } from '../../core/SwtorCharacter';

@Injectable({ providedIn: 'root' })
export class BuilderService {
  private _combatStylesIds: string[] | undefined;

  public combatStyles: CombatStyle[] | undefined;
  public disciplines: Discipline[] | undefined;
  public character: SwtorCharacter = new SwtorCharacter();

  get factions(): string[] { return Object.keys(FactionsEnum).filter(v => isNaN(Number(v))); }
  get combatStylesIds(): string[] | undefined {
    if (this.combatStyles && !this._combatStylesIds) {
      this._combatStylesIds = new Array(this.combatStyles.length);

      for (let i = 0; i < this.combatStyles.length; i++) {
        const cs = this.combatStyles[i];

        this._combatStylesIds[i] = cs.id;
      }
    }

    return this._combatStylesIds;
  }

  constructor(private http: HttpClient) { }

  public getCombatStyleById = (id: string): CombatStyle | undefined => {
    return this.getIdNamePairById(this.combatStyles, id);
  }

  public getDisciplineById = (id: string): Discipline | undefined => {
    return this.getIdNamePairById(this.disciplines, id);
  }

  private getIdNamePairById<T extends IdNamePair>(values: T[] | undefined, id: string): T | undefined {
    if (values) {
      const result = values.find(x => x.id === id);

      if (!result)
        console.warn(`Couldn't find ${id} in a IdNamePair array.`);

      return result;
    }
    else {
      console.warn("Attempted to find by id on an empty IdNamePair array.");

      return undefined;
    }
  }

  public async fetchData() {
    this.disciplines = await this.getDisciplinesJson();
    this.combatStyles = await this.getCombatStylesJson();

    for (let i = 0; i < this.combatStyles.length; i++) {
      const combatStyle = this.combatStyles[i];

      combatStyle.disciplines = new Array(combatStyle.disciplinesIds.length);

      for (let j = 0; j < combatStyle.disciplinesIds.length; j++) {
        const disciplineId = combatStyle.disciplinesIds[j];
        const discipline = this.getDisciplineById(disciplineId);

        if (discipline) {
          combatStyle.disciplines[j] = discipline;
          discipline.combatStyle = combatStyle;
        }
        else
          console.warn(`Failed to find discipline '${disciplineId}' object when attempting to add it to a combat style.`);
      }
    }
  }

  private getDisciplinesJson(): Promise<Discipline[]> {
    const req = this.http.get<Discipline[]>('/assets/data/disciplines.json');
    return lastValueFrom(req);
  }

  private getCombatStylesJson(): Promise<CombatStyle[]> {
    const req = this.http.get<CombatStyle[]>('/assets/data/combat-styles.json');
    return lastValueFrom(req);
  }
}