/**
 * Copy of BE response types
 */

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface User {}

export interface Empty {}

export interface APIResponse<T> {
  status: 'success' | 'failed';
  response?: T;
  err?: any;
}

// internal route types

interface Bounds {
  minlat: number;
  maxlat: number;
  minlon: number;
  maxlon: number;
}

export interface Point {
  lat: number;
  lon: number;
}

export interface RouteSteps {
  ref: number;
  geometry: Point[];
  distance?: number;
}

export interface Route {
  bounds: Bounds;
  id: number;
  tags: Record<string, string>;
  route: RouteSteps[];
}

export interface ProcessedRoute extends Route {
  edges: Point[];
  circular?: boolean;
  totalDistance: number;
}

export interface RoutesResponse {
  routes: ProcessedRoute[];
  location: Point;
  radius: number;
}
