import { Subtext } from "./Subtext";
import { SvgComponent } from "./BinSvg";
import { StyleSheet, View } from "react-native";
import colors from "../utils/colors.json";

export const FavoriteRoute = ({ text }) => {
  return (
    <View style={styles.container}>
      <Subtext>{text}</Subtext>
      <SvgComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: colors[0].dark,
    borderColor: colors[0].white,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    justifySelf: "flex-start",
    alignSelf: "stretch",
    padding: 8,
    zIndex: 8,
    margin: 8,
    borderRadius: 4,
    flexDirection: "row",
  },
});
