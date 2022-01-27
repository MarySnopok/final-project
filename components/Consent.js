import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ConsentContainer } from "../ui_fractions/ConsentContainer";
import { Link } from "react-router-dom";
import { Card } from "../ui_fractions/Card";
import { Box } from "../ui_fractions/Box";
import { Paragraph } from "../ui_fractions/Paragraph";
import { Subtext } from "../ui_fractions/Subtext";
import { GeneralButton } from "../ui_fractions/GeneralButton";
import { Heading } from "../ui_fractions/Heading";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from "../utils/colors.json";
import user from "../reducers/user";

export const Consent = () => {
  const [check, onCheckMarkChange] = useState(true);
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken) {
      dispatch(user.actions.setAccessToken(null));
    }
  }, [accessToken]);

  console.log(">>>", check);
  return (
    <>
      <Card>
        <Heading>Provide consent</Heading>
        <Box>
          <Paragraph>
            We want to get your consent to use your current geo-location data. Please note that by proceeding further you are providing your consent for data
            processing.
          </Paragraph>
          <ConsentContainer>
            <BouncyCheckbox
              size={25}
              isChecked={true}
              fillColor={colors[0].earth}
              unfillColor={colors[0].white}
              iconStyle={{ borderColor: colors[0].white }}
              textStyle={{ fontFamily: "JosefinSans-Regular" }}
              onPress={(isChecked) => {
                onCheckMarkChange(isChecked);
              }}
            />
            <Subtext>Yes, I do agree to share my geo-location data, while using the app.</Subtext>
          </ConsentContainer>
        </Box>

        {check && (
          <Link to="/entrypage" style={{ textDecoration: "none" }} color={colors[0].white}>
            <GeneralButton children={"ok"} />
          </Link>
        )}
      </Card>
    </>
  );
};
