import { StyleSheet, Text } from "react-native";
import colors from "../utils/colors.json";

export const Paragraph = ({ children }) => {
  return <Text style={styles.typography}>{children}</Text>;
};

const styles = StyleSheet.create({
  typography: {
    flex: 0.5,
    alignSelf: "center",
    justifySelf: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    margin: 8,
    color: colors[0].font,
    fontSize: "medium",
    lineHeight: 30,
    zIndex: 12,
  },
});
