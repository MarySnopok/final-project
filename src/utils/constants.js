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
