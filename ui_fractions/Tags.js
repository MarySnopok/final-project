import colors from "../utils/colors.json";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import React, { useState } from "react";

export const PressTag = ({ children }) => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(count + 1);

  return (
    <TouchableHighlight style={styles.btn} underlayColor={colors[0].secondary} activeOpacity={0.78} onPress={onPress}>
      <Text style={styles.content}>{children}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btn: {
    flex: 0.02,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    margin: 24,
    backgroundColor: colors[0].primary,
    borderRadius: 6,
    zIndex: 14,
  },

  content: {
    textAlign: "center",
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: "normal",
    color: colors[0].white,
    textTransform: "capitalize",
  },
});
