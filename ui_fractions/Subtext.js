import { StyleSheet, Text } from "react-native";
import colors from "../utils/colors.json";

export const Subtext = ({ children }) => {
  return <Text style={styles.typography}>{children}</Text>;
};

const styles = StyleSheet.create({
  typography: {
    flex: 1,
    padding: 8,
    margin: 8,
    color: colors[0].white,
    fontSize: "smaller",
    lineHeight: 20,
    zIndex: 12,
  },
});
