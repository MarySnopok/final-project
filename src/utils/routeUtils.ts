import { ProcessedRoute, Route } from "../types/BE.types";
import { FERoute } from "../types/types";

export const distanceInKm = (totalDistance: number) => {
  const dist = totalDistance / 1000;
  if (isNaN(dist)) {
    return null;
  }

  if (dist < 10) {
    return dist.toFixed(1);
  }
  return dist.toFixed(0);
};

export const distanceInMiles = (totalDistance: number) => {
  const dist = (totalDistance / 1000) * 0.621371;
  if (isNaN(dist)) {
    return null;
  }

  if (dist < 10) {
    return dist.toFixed(1);
  }
  return dist.toFixed(0);
};

export const duration = (route: ProcessedRoute): string => {
  const newDuration = Math.round(route.totalDistance / 4 / 1000);
  if (isNaN(newDuration) || newDuration === 0) {
    return "0.5";
  }

  return newDuration.toFixed(1);
};

export const difficulty = (route: ProcessedRoute) => {
  const routeDistance = route.totalDistance / 1000;
  const statements = {
    easy: "easy",
    medium: "medium",
    hard: "hard",
    multi: "multi-day",
    unknown: "dare to try",
  };

  if (routeDistance <= 6) {
    return statements.easy;
  }
  if (routeDistance >= 7 && routeDistance <= 16) {
    return statements.medium;
  }
  if (routeDistance >= 17 && routeDistance <= 25) {
    return statements.hard;
  }
  if (routeDistance >= 26) {
    return statements.multi;
  }

  return statements.unknown;
};

export function calculateRouteParams(route: ProcessedRoute) {
  return {
    title: route.tags.name,
    distance: route.totalDistance,
    circular: route.circular,
    duration: duration(route),
    difficulty: difficulty(route),
  };
}
