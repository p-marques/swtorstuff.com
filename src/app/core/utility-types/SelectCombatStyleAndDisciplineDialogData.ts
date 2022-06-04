import { CombatStyle } from "../CombatStyle";
import { Discipline } from "../Discipline";

export interface SelectCombatStyleAndDisciplineDialogSeedData extends SelectCombatStyleAndDisciplineDialogResultData {
    combatStyles: CombatStyle[];
}

export interface SelectCombatStyleAndDisciplineDialogResultData {
    selectedCombatStyle?: CombatStyle;
    selectedDiscipline?: Discipline;
}