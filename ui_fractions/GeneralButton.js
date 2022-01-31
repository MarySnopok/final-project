import colors from "../utils/colors.json";
import { StyleSheet, TouchableHighlight, Text } from "react-native";

export const GeneralButton = ({ children, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress} style={styles.btn} underlayColor={colors[0].transparent} activeOpacity={0.78}>
      <Text style={styles.content}>{children}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btn: {
    flex: 0.01,
    alignSelf: "center",
    // justifySelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    paddingTop: 20,
    paddingRight: 22,
    paddingLeft: 22,
    margin: 16,
    backgroundColor: colors[0].secondary,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: colors[0].secondary,
    zIndex: 12,
    fontSize: 12,
  },

  content: {
    textAlign: "center",
    // fontSize: "medium",
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: "normal",
    // fontWeight: 300,
    color: colors[0].white,
    textTransform: "uppercase",
  },
});
