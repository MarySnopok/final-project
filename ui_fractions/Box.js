import { StyleSheet, View, Dimensions } from "react-native";
import colors from "../utils/colors.json";

export const Box = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[0].white,
    alignItems: "center",
    justifyContent: "center",
    justifySelf: "center",
    alignSelf: "center",
    padding: 8,
    zIndex: 8,
    margin: 8,
    borderRadius: 8,

    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
  },
});
