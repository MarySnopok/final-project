import { StyleSheet, Text } from "react-native";
import colors from "../utils/colors.json";

export const SubHeading = ({ children }) => {
  return <Text style={styles.typography}>{children}</Text>;
};

const styles = StyleSheet.create({
  typography: {
    padding: 8,
    margin: 8,
    color: colors[0].white,
    // fontSize: "normal",
    fontSize: 18,
    // lineHeight: 16,
    zIndex: 12,
  },
});
