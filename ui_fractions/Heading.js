import { StyleSheet, Text, View } from "react-native";
import colors from "../utils/colors.json";

export const Heading = ({ children }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.typography}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // flex: 0.01,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 30,
  },
  typography: {
    alignSelf: "center",

    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    color: colors[0].white,
    // fontSize: "large",
    fontSize: 20,
    fontWeight: "bold",
    // fontWeight: 300,
    zIndex: 12,
  },
});
