import { StyleSheet, View, Dimensions } from "react-native";
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
    margin: 8,
    borderRadius: 8,
    zIndex: 2,
    // maxHeight: Dimensions.get("window").height - 50,
    // width: Dimensions.get("window").width,
  },
});
