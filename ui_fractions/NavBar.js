import { StyleSheet, View, Dimensions } from "react-native";
import colors from "../utils/colors.json";

export const NavBar = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    backgroundColor: colors[0].grey,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "space-evenly",
    justifySelf: "flex-end",
    alignSelf: "stretch",
    flexDirection: "row",
    padding: 8,
    zIndex: 4,
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
  },
});
