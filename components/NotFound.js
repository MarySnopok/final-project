import React from "react";
import { Loader } from "../ui_fractions/Loader";
import colors from "../utils/colors.json";

export const NotFound = () => {
  return <Loader size={"large"} color={colors[0].primary} />;
};
