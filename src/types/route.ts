import type { Difficulty, TechnicalitySAC, RouteType, Season } from './common';

export interface HikingRoute {
  id: string;
  name: string;
  thumbnail: string;
  distance: number; // in km
  duration: number; // in minutes
  difficulty: Difficulty;
  technicality: TechnicalitySAC;
  highlights: string[];
  features: string[];
  facilities: string[];
  accessibility: string[];
  routeType: RouteType;
  season: Season;
  location: string;
  description: string;
}

export interface RouteFilterOptions {
  difficulty: readonly Difficulty[];
  technicality: readonly TechnicalitySAC[];
  duration: { label: string; min: number; max: number }[];
  features: string[];
  highlights: string[];
  facilities: string[];
  accessibility: string[];
  routeType: readonly RouteType[];
  season: readonly Season[];
}
