import colors from "../utils/colors.json";
import { StyleSheet, TouchableHighlight, Text } from "react-native";

export const NavButton = ({ children, onPress }) => {
  return (
    <TouchableHighlight style={styles.navbtn} underlayColor={colors[0].transparent} activeOpacity={0.78} onPress={onPress}>
      {typeof children === "string" ? <Text style={styles.content}>{children}</Text> : children}
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
    zIndex: 12,
    maxWidth: 100,
  },

  content: {
    fillColor: colors[0].secondary,
  },
});
