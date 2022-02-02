import { StyleSheet, View, Text } from "react-native";
import colors from "../utils/colors.json";

export const NoRoutes = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.typography}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 16,
    margin: 8,
    padding: 8,
  },
  typography: {
    color: colors[0].primary,
    fontSize: 18,
    textAlign: "center",
  },
});
