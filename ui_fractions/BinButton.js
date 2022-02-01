import colors from "../utils/colors.json";
import { StyleSheet, TouchableHighlight } from "react-native";
import { BinSvg } from "./BinSvg";

export const BinButton = ({ onPress }) => {
  return (
    <TouchableHighlight style={styles.binbtn} underlayColor={colors[0].grey} activeOpacity={0.78} onPress={onPress}>
      <BinSvg style={styles.pic} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  binbtn: {
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: 8,
    // paddingBottom: 8,
    // paddingLeft: 12,
    // paddingRight: 12,
    margin: 8,
    // backgroundColor: colors[0].secondary,
    // borderRadius: 10,
    // borderWidth: 2,
    // borderColor: colors[0].secondary,
    zIndex: 14,
  },
  pic: {
    height: 20,
    width: 20,
  },
});
