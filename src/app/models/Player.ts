import { CurrentTeam } from "./CurrentTeam";
import { Splits } from "./Splits";
import { PrimaryPosition } from "./PrimaryPosition";

export interface Player {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  primaryNumber: number;
  birthDate: string;
  currentAge: number;
  birthCity: string;
  birthStateProvince: string;
  birthCountry: string;
  nationality: string;
  height: string;
  weight: number;
  active: boolean;
  alternateCaptain: boolean;
  captain: boolean;
  rookie: boolean;
  shootsCatches: string;
  rosterStatus: string;
  currentTeam: CurrentTeam;
  primaryPosition: PrimaryPosition;
  stats: Splits[];
}
