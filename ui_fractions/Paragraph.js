import { StyleSheet, Text, View } from "react-native";
import colors from "../utils/colors.json";

export const Paragraph = ({ children }) => {
  return (
    <View>
      <Text style={styles.typography}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  typography: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    margin: 8,
    color: colors[0].white,
    fontSize: 16,
    lineHeight: 26,
    zIndex: 12,
  },
});
