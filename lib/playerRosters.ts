import rosterData from "@/data/player-rosters.json";

export interface PlayerRosterStats {
  appearances: number | null;
  starts: number | null;
  minutes: number | null;
  goals: number | null;
  assists: number | null;
  yellowCards: number | null;
  redCards: number | null;
  shotsTotal: number | null;
  shotsOnTarget: number | null;
  passesTotal: number | null;
  keyPasses: number | null;
  dribblesAttempted: number | null;
  dribblesSuccess: number | null;
  passAccuracy: number | null;
}

export interface PlayerRosterLeagueStat {
  name: string;
  logoUrl: string;
  appearances: number | null;
  goals: number | null;
  assists: number | null;
  yellowCards: number | null;
  redCards: number | null;
}

export interface PlayerRosterRecord {
  id: string;
  number: string;
  name: string;
  fullName: string;
  teamId: string;
  teamName: string;
  teamLogoUrl: string;
  positionKey: string;
  positionZh: string;
  age: number | null;
  photoUrl: string;
  birthDate: string;
  nationality: string;
  heightCm: number | null;
  weightKg: number | null;
  stats: PlayerRosterStats | null;
  leagues: PlayerRosterLeagueStat[];
}

export interface PlayerRosterTeam {
  id: string;
  nameZh: string;
  logoUrl: string;
}

export interface PlayerRosterPosition {
  key: string;
  nameZh: string;
}

export interface PlayerRosterDataset {
  sourceUrl: string;
  sourceLabel: string;
  fetchedAt: string;
  totalPlayers: number;
  totalTeams: number;
  teams: PlayerRosterTeam[];
  positions: PlayerRosterPosition[];
  players: PlayerRosterRecord[];
}

export const playerRosterDataset = rosterData as PlayerRosterDataset;
