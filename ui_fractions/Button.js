import colors from "../utils/colors.json";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import React, { useState } from "react";

export const GeneralButton = ({ children }) => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(count + 1);

  return (
    <TouchableHighlight style={styles.btn} underlayColor={colors[0].grey} activeOpacity={0.78} onPress={onPress}>
      <Text style={styles.content}>{children}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btn: {
    flex: 0.01,
    alignSelf: "center",
    justifySelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 22,
    paddingTop: 22,
    paddingRight: 24,
    paddingLeft: 24,
    margin: 24,
    backgroundColor: colors[0].font,
    borderRadius: 36,
    borderColor: colors[0].white,
    borderWidth: 1,
    zIndex: 12,
  },

  content: {
    textAlign: "center",
    fontSize: "medium",
    letterSpacing: 1,
    fontWeight: "normal",
    color: colors[0].white,
    textTransform: "uppercase",
  },
});
