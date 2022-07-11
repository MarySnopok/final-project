import * as React from "react";
import Svg, { Path } from "react-native-svg";
import colors from "../../utils/colors.json";

export const HeartSvg = (props) => (
  <Svg
    aria-hidden="true"
    data-prefix="fas"
    data-icon="heart"
    className="svg-inline--fa fa-heart fa-w-16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path
      fill={colors[0].secondary}
      d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
    />
  </Svg>
);