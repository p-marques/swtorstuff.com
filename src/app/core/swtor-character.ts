import { CombatStylesEnum } from "./combat-styles-enum";
import { FactionsEnum } from "./factions-enum";

export class SwtorCharacter {
    public name: string = "Default_Name";
    public readonly level: number = 80;
    private _combatStyle: CombatStylesEnum = CombatStylesEnum.Guardian;
    public faction: FactionsEnum = FactionsEnum.Republic;

    get combatStyle() { return this._combatStyle; }
    set combatStyle(value: CombatStylesEnum) {
        if (value < CombatStylesEnum.Guardian || value > CombatStylesEnum.Operative) {
            return;
        }

        this._combatStyle = value;
    }
    get combatStyleName(): string { return CombatStylesEnum[this._combatStyle]; }
}