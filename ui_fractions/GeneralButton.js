import colors from "../utils/colors.json";
import { StyleSheet, TouchableHighlight, Text } from "react-native";

export const GeneralButton = ({ children, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress} style={styles.btn} underlayColor={colors[0].grey} activeOpacity={0.78}>
      <Text style={styles.content}>{children}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btn: {
    flex: 0.01,
    alignSelf: "center",
    justifySelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    paddingTop: 20,
    paddingRight: 22,
    paddingLeft: 22,
    margin: 16,
    backgroundColor: colors[0].earth,
    borderRadius: 36,
    zIndex: 12,
  },

  content: {
    textAlign: "center",
    fontSize: "medium",
    letterSpacing: 1,
    fontWeight: "normal",
    color: colors[0].white,
    textTransform: "uppercase",
  },
});
