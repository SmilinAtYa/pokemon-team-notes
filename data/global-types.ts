interface SpeciesAbility {
  0: string;
  1?: string;
  H?: string;
  S?: string;
}

type StatIDExceptHP = "atk" | "def" | "spa" | "spd" | "spe";
type StatID = "hp" | StatIDExceptHP;
type StatsTable = { [stat in StatID]: number };
type GenderName = "M" | "F" | "N" | "";
type SpeciesTag =
  | "Mythical"
  | "Restricted Legendary"
  | "Sub-Legendary"
  | "Ultra Beast"
  | "Paradox";

export interface SpeciesData {
  name: string;
  /** National Dex number */
  num: number;

  types: string[];
  abilities: SpeciesAbility;
  baseStats: StatsTable;
  eggGroups: string[];
  weightkg: number;
  gen?: number;
  readonly genderRatio?: { M: number; F: number };
  readonly heightm: number;
  readonly color: string;
  readonly evos?: string[];
  readonly evoType?:
    | "trade"
    | "useItem"
    | "levelMove"
    | "levelExtra"
    | "levelFriendship"
    | "levelHold"
    | "other";
  readonly prevo?: string;
  readonly evoLevel?: number;
  readonly otherFormes?: string[];
  readonly formeOrder?: string[];
  readonly baseSpecies?: string;
  readonly forme?: string;
  readonly requiredItem?: string;
  readonly canGigantamax?: string;
  readonly changesFrom?: string;
  readonly evoCondition?: string;
  readonly gender?: GenderName;
  readonly evoItem?: string;
  readonly evoRegion?: "Alola" | "Galar";
  readonly evoMove?: string;
  readonly canHatch?: boolean;
  readonly requiredAbility?: string;
  readonly battleOnly?: string | string[];
  readonly baseForme?: string;
  readonly forceTeraType?: string;
  readonly tags?: SpeciesTag[];
  readonly requiredMove?: string;
  readonly requiredItems?: string[];
  readonly cosmeticFormes?: string[];
  readonly cannotDynamax?: boolean;
  readonly maxHP?: number;
}
