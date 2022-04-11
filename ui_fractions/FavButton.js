import colors from "../utils/colors.json";
import { StyleSheet, TouchableHighlight } from "react-native";
import { HeartSvg } from "./svg_components/HeartSvg";
import { ShallowHeartSvg } from "./svg_components/ShallowHeartSvg";

export const FavButton = ({ onPress }) => {
  return (
    <TouchableHighlight style={styles.binbtn} underlayColor={colors[0].transparent} activeOpacity={0.78} onPress={onPress}>
      <ShallowHeartSvg style={styles.pic} />
    </TouchableHighlight>
  );
};

export const FavButtonAfter = ({ onPress }) => {
  return (
    <TouchableHighlight style={styles.binbtn} underlayColor={colors[0].transparent} activeOpacity={0.78} onPress={onPress}>
      <HeartSvg style={styles.pic} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  binbtn: {
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    zIndex: 14,
  },
  pic: {
    height: 24,
    width: 24,
  },
});
