import colors from "../utils/colors.json";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const GeneralButton = ({ children, onPress, disabled }) => {
  return (
    <SafeAreaView>
      <TouchableHighlight
        disabled={disabled}
        onPress={onPress}
        style={disabled ? styles.disabled : styles.btn}
        underlayColor={colors[0].transparent}
        activeOpacity={0.78}
      >
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
    padding: 20,
    margin: 8,
    backgroundColor: colors[0].secondary,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors[0].secondary,
    zIndex: 12,
  },

  disabled: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: 8,
    backgroundColor: colors[0].grey,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors[0].grey,
    zIndex: 12,
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
