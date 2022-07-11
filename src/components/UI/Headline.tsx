import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import colors from "../../utils/colors.json";

interface HeadlineProps {
  children: string;
  style?: StyleProp<ViewStyle>;
}

export const Headline = ({ children, style }: HeadlineProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.typography, style]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  typography: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    color: colors[0].white,
    fontSize: 20,
    fontWeight: "bold",
    zIndex: 12,
  },
});
