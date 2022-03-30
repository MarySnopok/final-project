import { StyleSheet, Text } from "react-native";
import colors from "../utils/colors.json";

export const CommentsText = ({ children }) => {
  return <Text style={styles.typography}>{children}</Text>;
};

const styles = StyleSheet.create({
  typography: {
    color: colors[0].white,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    fontSize: 16,
    lineHeight: 20,
    zIndex: 12,
    marginTop: 8,
    padding: 0,
  },
});
