import colors from "../utils/colors.json";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

export const Input = ({ value, name, type, onChange, placeholder }) => {
  return (
      <TextInput
        style={[styles.base, name === "password" && value.length >= 1 && value.length < 5 ? styles.alert : styles.normal]}
        value={value}
        onChangeText={(text) => onChange({ name, type, text })}
        placeholder={placeholder}
      />
  );
};

const styles = StyleSheet.create({
  base: {
    padding: 12,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 16,
  },
  alert: {
    color: colors[0].error,
    backgroundColor: colors[0].alertBackground,
    // borderRadius: 8,
    borderColor: colors[0].error,
  },
  normal: {
    color: colors[0].dark,
    backgroundColor: colors[0].normalBackground,
    // borderRadius: 8,
    borderColor: colors[0].secondary,
  },
});
