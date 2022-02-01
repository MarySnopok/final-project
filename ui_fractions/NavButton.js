import colors from "../utils/colors.json";
import { StyleSheet, TouchableHighlight, Text } from "react-native";

export const NavButton = ({ children, onPress }) => {
  return (
    <TouchableHighlight style={styles.navbtn} underlayColor={colors[0].transparent} activeOpacity={0.78} onPress={onPress}>
      <Text style={styles.content}>{children}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  navbtn: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    margin: 8,
    backgroundColor: colors[0].secondary,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors[0].secondary,
    zIndex: 12,
  },

  content: {
    textAlign: "center",
    // fontSize: "smaller",
    fontSize: 14,
    fontWeight: "normal",
    // fontWeight: 300,
    color: colors[0].white,
    textTransform: "lowercase",
  },
});
