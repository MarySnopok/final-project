import { StyleSheet, Text } from "react-native";
import colors from "../utils/colors.json";

export const ExtraInfo = ({ children }) => {
  return <Text style={styles.typography}>{children}</Text>;
};

const styles = StyleSheet.create({
  typography: {
    flex: 1,
    color: colors[0].white,
    fontSize: 16,
    alignItems: "center",
    // justifyContent: "baseline",
    justifyContent: "center",
    // lineHeight: 18,
    paddingBottom: 8,
    zIndex: 12,
    flexWrap: "wrap",
    flexDirection: "column",
  },
});
