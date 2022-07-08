import colors from "../utils/colors.json";
import { StyleSheet, TouchableHighlight, Text, SafeAreaView } from "react-native";

export const SubmitButton = ({ children, onPress }) => {
  return (
    <SafeAreaView>
      <TouchableHighlight disabled={false} onPress={onPress} style={styles.btn} underlayColor={colors[0].transparent} activeOpacity={0.78}>
        {typeof children === "string" ? <Text style={styles.content}>{children}</Text> : children}
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    margin: 8,
    width: 240,
    backgroundColor: colors[0].secondary,
    borderWidth: 2,
    borderColor: colors[0].secondary,
    zIndex: 12,
    // borderRadius: 8,
  },

  content: {
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "bold",
    color: colors[0].white,
    textTransform: "uppercase",
  },
});
