import { CombatStyle } from "./CombatStyle";
import { Discipline } from "./Discipline";
import { FactionsEnum } from "./FactionsEnum";

export class SwtorCharacter {
    private _name: string | undefined;
    private _combatStyle: CombatStyle | undefined;
    private _faction: FactionsEnum = FactionsEnum.Republic;
    private _discipline: Discipline | undefined;
    public readonly level: number = 80;

    get name(): string | undefined { return this._name; }
    set name(value: string | undefined) {
        value = value?.trim();
        if (!value || value.length < 3 || value.length > 20) return;

        this._name = value;
    }

    get combatStyle(): CombatStyle | undefined { return this._combatStyle; }
    set combatStyle(value: CombatStyle | undefined) {
        this._combatStyle = value;
    }

    get faction(): FactionsEnum { return this._faction; }
    set faction(value: FactionsEnum) {
        if (value == FactionsEnum.Republic || value == FactionsEnum.Empire)
            this._faction = value;
    }

    get discipline(): Discipline | undefined { return this._discipline; }
    set discipline(value: Discipline | undefined) {
        this._discipline = value;
    }
}