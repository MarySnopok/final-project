import { StyleSheet, View } from "react-native";
import colors from "../utils/colors.json";

export const Card = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[0].dark,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    zIndex: 2,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
