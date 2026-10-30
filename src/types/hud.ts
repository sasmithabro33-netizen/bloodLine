export type ScreenId = 'live-hud' | 'roster' | 'leaderboard' | 'war-room' | 'arsenal';

export interface PlayerVitals {
  id: string;
  ign: string;
  name: string;
  role: 'IGL' | 'ENTRY FRAGGER' | 'SNIPER' | 'SUPPORT';
  avatar: string;
  hp: number;
  maxHp: number;
  ep: number;
  maxEp: number;
  armorVest: number; // 0 to 100
  armorHelmet: number; // 0 to 100
  kills: number;
  damage: number;
  ping: number;
  isAlive: boolean;
  primaryWeapon: {
    name: string;
    ammo: number;
    maxClip: number;
    reserve: number;
    dps: number;
  };
  secondaryWeapon: {
    name: string;
    ammo: number;
    maxClip: number;
    reserve: number;
    dps: number;
  };
  glooWalls: number;
  medkits: number;
}

export interface PlayerProfile extends PlayerVitals {
  country: string;
  countryCode: string;
  bio: string;
  kdRatio: number;
  headshotRate: number; // percentage
  winRate: number; // percentage
  tournamentCaps: number;
  sensitivities: {
    general: number;
    redDot: number;
    scope2x: number;
    scope4x: number;
    sniper: number;
    freeLook: number;
  };
  signatureWeapon: string;
  achievements: string[];
}

export interface KillFeedEvent {
  id: string;
  timestamp: string;
  killer: string;
  killerTeam: string;
  victim: string;
  victimTeam: string;
  weapon: string;
  isHeadshot: boolean;
  isBloodreign: boolean;
  isSquadWipe?: boolean;
}

export interface TeamStanding {
  rank: number;
  teamName: string;
  tag: string;
  logoColor: string;
  booyahs: number;
  matchesPlayed: number;
  placementPoints: number;
  killPoints: number;
  totalPoints: number;
  status: 'QUALIFIED' | 'CONTENDING' | 'ELIMINATED';
  trend: 'up' | 'down' | 'same';
  players: string[];
}

export interface WeaponData {
  id: string;
  name: string;
  category: 'SMG' | 'SHOTGUN' | 'ASSAULT RIFLE' | 'SNIPER' | 'DMR';
  damage: number;
  fireRate: number;
  range: number;
  reloadSpeed: number;
  magazine: number;
  accuracy: number;
  armorPenetration: number;
  movementSpeed: number;
  description: string;
  tier: 'S+' | 'S' | 'A' | 'B';
}

export interface MapLocation {
  id: string;
  name: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  lootTier: 'High' | 'Medium' | 'Low';
  dangerLevel: 'Extreme' | 'High' | 'Moderate';
  elevation: 'High Ground' | 'Valley' | 'Plateau' | 'Coastal';
  vehicleSpawn: boolean;
}

export interface TacticalMarker {
  id: string;
  x: number;
  y: number;
  type: 'bloodreign' | 'enemy' | 'airdrop' | 'waypoint' | 'gloo';
  label: string;
}
