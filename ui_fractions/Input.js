import colors from "../utils/colors.json";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

export const Input = ({ value, name, type, onChange }) => {
  return (
    <SafeAreaView>
      <TextInput style={styles.input} value={value} onChangeText={(text) => onChange({ name, type, text })} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    alignSelf: "center",
    justifySelf: "center",
    padding: 8,
    margin: 8,
    backgroundColor: colors[0].white,
    color: colors[0].font,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors[0].font,
    zIndex: 14,
  },
});
