import colors from "../utils/colors.json";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

export const Input = ({ value, name, type, onChange, placeholder }) => {
  return (
    <SafeAreaView>
      <TextInput
        style={value.length >= 1 && value.length < 5 ? styles.alert : styles.normal}
        value={value}
        onChangeText={(text) => onChange({ name, type, text })}
        placeholder={placeholder}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  alert: {
    color: colors[0].error,
    flex: 1,
    alignSelf: "center",
    // justifySelf: "center",
    padding: 12,
    margin: 8,
    backgroundColor: colors[0].alertBackground,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors[0].error,
    zIndex: 14,
    fontSize: 16,
  },
  normal: {
    color: colors[0].dark,
    flex: 1,
    alignSelf: "center",
    // justifySelf: "center",
    padding: 12,
    margin: 8,
    backgroundColor: colors[0].normalBackground,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors[0].secondary,
    zIndex: 14,
    fontSize: 16,
  },
});
