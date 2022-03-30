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
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    zIndex: 14,
    maxWidth: 100,
  },

  content: {
    color: colors[0].secondary,
    fontWeight: "bold",
    marginTop: 4,
    marginRight: 0,
    marginLeft: 8,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
