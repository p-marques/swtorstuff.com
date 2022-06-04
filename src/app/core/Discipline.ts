import { CombatStyle } from "./CombatStyle";
import { IdNamePair } from "./IdNamePair";
import { RoleEnum } from "./RoleEnum";

export interface Discipline extends IdNamePair {
    role: RoleEnum;
    combatStyleId: string;
    combatStyle: CombatStyle;
}