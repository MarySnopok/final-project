import { StyleSheet, Text } from "react-native";
import colors from "../utils/colors.json";

export const Subtext = ({ children }) => {
  return <Text style={styles.typography}>{children}</Text>;
};

const styles = StyleSheet.create({
  typography: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 0,
    marginTop: 8,
    marginBottom: 8,
    marginHorizontal: 0,
    color: colors[0].white,
    alignItems: "center",
    fontSize: 16,
    lineHeight: 20,
    zIndex: 12,
    textAlign: "center",
  },
});
