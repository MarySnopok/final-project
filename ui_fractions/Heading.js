import { StyleSheet, Text } from "react-native";
import colors from "../utils/colors.json";

export const Heading = ({ children }) => {
  return <Text style={styles.typography}>{children}</Text>;
};

const styles = StyleSheet.create({
  typography: {
    flex: 0.01,
    alignSelf: "center",
    justifySelf: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    margin: 24,
    color: colors[0].white,
    fontSize: "larger",
    fontWeight: "bolder",
    zIndex: 12,
  },
});
