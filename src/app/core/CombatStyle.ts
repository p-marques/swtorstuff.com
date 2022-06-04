import { Discipline } from "./Discipline";
import { IdNamePair } from "./IdNamePair";

export interface CombatStyle extends IdNamePair {
    disciplines: Discipline[];
    disciplinesIds: string[];
}



