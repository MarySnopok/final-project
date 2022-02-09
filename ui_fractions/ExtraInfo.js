import { StyleSheet, Text } from "react-native";
import colors from "../utils/colors.json";

export const ExtraInfo = ({ data, comment }) => {
  return (
    <Text style={styles.typography}>
      {data}
      {comment}
    </Text>
  );
};

const styles = StyleSheet.create({
  typography: {
    flex: 1,
    color: colors[0].dark,
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    zIndex: 12,
    flexWrap: "wrap",
    flexDirection: "column",
  },
});
