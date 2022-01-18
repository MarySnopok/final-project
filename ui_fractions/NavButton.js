import colors from "../utils/colors.json";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import React, { useState } from "react";

export const NavButton = ({ children }) => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(count + 1);

  return (
    <TouchableHighlight style={styles.navbtn} underlayColor={colors[0].rosybrown} activeOpacity={0.78} onPress={onPress}>
      <Text style={styles.content}>{children}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  navbtn: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    margin: 8,
    backgroundColor: colors[0].white,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: colors[0].font,
    zIndex: 12,
  },

  content: {
    textAlign: "center",
    fontSize: "smaller",
    letterSpacing: 1,
    fontWeight: "normal",
    color: colors[0].font,
    textTransform: "lowercase",
  },
});
