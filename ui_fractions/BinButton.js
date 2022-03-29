import colors from "../utils/colors.json";
import { StyleSheet, TouchableHighlight } from "react-native";
import { BinSvg } from "./svg_components/BinSvg";

export const BinButton = ({ onPress }) => {
  return (
    <TouchableHighlight style={styles.binbtn} underlayColor={colors[0].transparent} activeOpacity={0.78} onPress={onPress}>
      <BinSvg style={styles.pic} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  binbtn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    margin: 8,
    // borderWidth: 2,
    zIndex: 14,
    borderRadius: 20,
    // borderColor: colors[0].white,
    backgroundColor: colors[0].transparent,
  },
  pic: {
    height: 20,
    width: 20,
  },
});
