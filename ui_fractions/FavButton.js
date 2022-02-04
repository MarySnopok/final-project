import colors from "../utils/colors.json";
import { StyleSheet, TouchableHighlight } from "react-native";
import { FavSvg } from "../ui_fractions/FavSvg";
// import { HeartSvg } from "./HeartSvg";
export const FavButton = ({ onPress }) => {
  return (
    <TouchableHighlight style={styles.binbtn} underlayColor={colors[0].primary} activeOpacity={0.78} onPress={onPress}>
      <FavSvg style={styles.pic} />
      {/* <HeartSvg style={styles.pic} /> */}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  binbtn: {
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    padding: 8,
    zIndex: 14,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: colors[0].secondary,
  },
  pic: {
    height: 22,
    width: 22,
  },
});
