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
    //flex: 0.01,
    alignSelf: "center",
    // justifySelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 16,
    backgroundColor: colors[0].secondary,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: colors[0].secondary,
    zIndex: 12,
  },

  content: {
    textAlign: "center",
    // fontSize: "medium",
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "normal",
    // fontWeight: 300,
    color: colors[0].white,
    textTransform: "uppercase",
  },
});
