import colors from "../utils/colors.json";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import { GeneralButton } from "./GeneralButton";
import { useNavigate } from "react-router";

export const LinkButton = ({ children, onPress, to, ...rest }) => {
  const navigate = useNavigate();
  return (
    <GeneralButton onPress={() => navigate(to)} {...rest}>
      {children}
    </GeneralButton>
  );
};
