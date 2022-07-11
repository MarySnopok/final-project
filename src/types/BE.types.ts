/**
 * Copy of BE response types
 */

/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-empty-interface */

export type RouteId = number;

export interface User {
  username: string;
  password: string;
  email: string;
  accessToken: string;
  favorite: { id: RouteId }[];
  profilePicture?: string;
  _id: string;
}

export interface ProfileResponse {
  username: string;
  email: string;
  _id: string;
  profilePicture?: string;
}

export interface Empty {}

export interface APIResponse<T> {
  status: "success" | "failed";
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
  id: RouteId;
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

export interface RouteResponse {
  route: ProcessedRoute;
}
