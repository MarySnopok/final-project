import colors from "../utils/colors.json";

const BASE_URL = "https://final-project-backend-hikernav.herokuapp.com";
// const BASE_URL = "http://localhost:8080";

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

export const pickRandomBackground = () => {
  const color = leftColors[Math.floor(Math.random() * leftColors.length)];
  leftColors.splice(leftColors.indexOf(color), 1);
  if (leftColors.length === 0) {
    leftColors = Object.values(backgrounds);
  }
  return color;
};

// manipulations with incoming route details
export const distanceRowData = (route) => route.tags.distance;

export const distanceInKm = (route) => {
  const newDistance = parseInt(route.tags.distance, 10);
  if (isNaN(newDistance)) {
    return null;
  }
  return newDistance;
};

export const duration = (route) => {
  const newDuration = Math.round(parseInt(route.tags.distance, 10) / 6);
  if (isNaN(newDuration)) {
    return null;
  }
  if (newDuration === 0) {
    return 0.5;
  }
  return newDuration;
};

export const difficulty = (route) => {
  const rowDistance = route.tags.distance;
  const routeDistance = parseInt(rowDistance, 10);
  const statements = {
    easy: "easy",
    medium: "medium",
    hard: "hard",
  };
  if (!rowDistance) {
    return statements.medium;
  }
  if (routeDistance <= 5) {
    return statements.easy;
  }
  if (routeDistance > 5 && routeDistance <= 10) {
    return statements.medium;
  }
  if (routeDistance > 10) {
    return statements.hard;
  }
};
