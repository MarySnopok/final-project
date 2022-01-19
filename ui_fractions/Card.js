import { StyleSheet, View, Dimensions } from "react-native";
import colors from "../utils/colors.json";

export const Card = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[0].dark,
    borderWidth: 2,
    borderColor: colors[0].primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    margin: 8,
    borderRadius: 8,
    zIndex: 2,
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
  },
});
