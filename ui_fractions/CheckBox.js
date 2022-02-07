import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from "../utils/colors.json";

export const CheckBox = ({ onPress, isChecked }) => {
  return (
    <>
      <BouncyCheckbox
        size={25}
        isChecked={isChecked}
        fillColor={colors[0].secondary}
        unfillColor={colors[0].white}
        iconStyle={{ borderColor: colors[0].secondary, borderWidth: 2 }}
        // textStyle={{ fontFamily: "JosefinSans-Regular" }}
        onPress={onPress}
      />
    </>
  );
};
