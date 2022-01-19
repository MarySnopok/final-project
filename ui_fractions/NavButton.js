import colors from "../utils/colors.json";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import React, { useState } from "react";

export const NavButton = ({ children }) => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(count + 1);

  return (
    <TouchableHighlight style={styles.navbtn} underlayColor={colors[0].primary} activeOpacity={0.78} onPress={onPress}>
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
    backgroundColor: colors[0].dark,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors[0].primary,
    zIndex: 12,
  },

  content: {
    textAlign: "center",
    fontSize: "smaller",
    fontWeight: "bolder",
    color: colors[0].white,
    textTransform: "lowercase",
  },
});
