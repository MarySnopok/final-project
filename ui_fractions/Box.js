import { StyleSheet, View, Dimensions } from "react-native";
import colors from "../utils/colors.json";

export const Box = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    backgroundColor: colors[0].dark,
    borderColor: colors[0].primary,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    justifySelf: "center",
    alignSelf: "center",
    padding: 8,
    zIndex: 8,
    margin: 8,
    borderRadius: 4,

    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
  },
});
