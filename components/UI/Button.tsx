import colors from "../../utils/colors.json";
import { StyleSheet, TouchableHighlight, Text } from "react-native";

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode | string;
  disabled?: boolean;
  stretch?: boolean;
  loading?: boolean;
}

export const BaseButton: React.FC<ButtonProps> = ({
  children,
  onPress,
  disabled,
  stretch,
  loading,
}) => {
  const dis = disabled || loading;
  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onPress}
      style={[styles.btn, stretch && styles.stretch, dis && styles.disabled]}
      underlayColor={colors[0].transparent}
      activeOpacity={0.78}
    >
      {loading ? (
        <Text>LOADING</Text>
      ) : typeof children === "string" ? (
        <Text style={styles.content}>{children}</Text>
      ) : (
        children
      )}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 12,
    // flex: 1,
    backgroundColor: colors[0].secondary,
    zIndex: 12,
    borderRadius: 8,
    height: 42,
  },
  stretch: {
    alignSelf: "stretch",
  },
  disabled: {
    backgroundColor: "#ff0cb64c",
    borderColor: colors[0].secondary,
    borderWidth: 2,
  },

  content: {
    textAlign: "center",
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },

  iconButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBorder: {
    borderWidth: 2,
    borderColor: "darkgray",
    borderRadius: 21,
  },
});

export const Button = BaseButton;

export const IconButton: React.FC<{
  onPress: any;
  icon: any;
  withBorder?: true;
}> = ({ onPress, icon, withBorder }) => {
  return (
    <TouchableHighlight
      disabled={false}
      onPress={onPress}
      style={[styles.iconButton, withBorder && styles.iconBorder]}
      underlayColor={colors[0].transparent}
      activeOpacity={0.78}
    >
      {icon}
    </TouchableHighlight>
  );
};
