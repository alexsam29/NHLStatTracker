import { StatDetails } from './StatDetails';

export interface Year {
  season: string;
  stat: StatDetails;
  team: { name: string; link: string };
  league: { league: string; link: string };
  sequenceNumber: number;
}
