import colors from "../utils/colors.json";
import tinycolor from "tinycolor2";

// const BASE_URL = "https://final-project-backend-hikernav.herokuapp.com";
const BASE_URL = "http://localhost:8080";

export const API_URL = (slug) => `${BASE_URL}/${slug}`;

// styling func
const backgrounds = {
  lightgreen: colors[0].lightGreen,
  lightblue: colors[0].lightBlue,
  lightpink: colors[0].lightPink,
  lightyellow: colors[0].lightYellow,
  lightviolet: colors[0].lightViolet,
  lightorange: colors[0].lightOrange,
};

let leftColors = Object.values(backgrounds);

/**
 * changes alpha channel of givin color
 * @param {string} color : color;
 * @param {number} alpha: new alpha
 * @returns color with set alpha channel
 */
export const makeOpaq = (color, alpha) => {
  return tinycolor(color).setAlpha(alpha).toString("rgb");
}

export const pickRandomBackground = () => {
  const color = leftColors[Math.floor(Math.random() * leftColors.length)];
  leftColors.splice(leftColors.indexOf(color), 1);
  if (leftColors.length === 0) {
    leftColors = Object.values(backgrounds);
  }
  return color;
};

// manipulations with incoming route details

export const distanceRowData = (route) => route.totalDistance;

export const distanceInKm = (route) => {
  const dist = (route.totalDistance / 1000);
  if (isNaN(dist)) {
    return null;
  }

  if (dist < 10) {
    return dist.toFixed(1);
  }
  return dist.toFixed(0);
};

export const duration = (route) => {
  const newDuration = Math.round(route.totalDistance / 4 / 1000);
  if (isNaN(newDuration)) {
    return null;
  }
  if (newDuration === 0) {
    return 0.5;
  }
  return newDuration.toFixed(1);
};

export const difficulty = (route) => {
  const routeDistance = route.totalDistance / 1000;
  const statements = {
    easy: "easy",
    medium: "medium",
    hard: "hard",
    multi: "multi-day",
    unknown: "dare to try",
  };
  if (!routeDistance) {
    return statements.unknown;
  }
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
};
