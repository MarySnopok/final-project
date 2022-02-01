import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text } from "react-native";
import { ConsentContainer } from "../ui_fractions/ConsentContainer";
import { Link } from "../ui_fractions/router/react-router";
import { Card } from "../ui_fractions/Card";
import { Box } from "../ui_fractions/Box";
import { Paragraph } from "../ui_fractions/Paragraph";
import { Subtext } from "../ui_fractions/Subtext";
import { GeneralButton } from "../ui_fractions/GeneralButton";
import { Heading } from "../ui_fractions/Heading";
import { CheckBox } from "../ui_fractions/CheckBox";
import { LayoutFlex, LayoutNavbar, LayoutRoot } from "../ui_fractions/Layout";
import colors from "../utils/colors.json";
import user from "../reducers/user";
import { LinkButton } from "../ui_fractions/LinkButton";

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
    <LayoutRoot>
      <Card>
        <Heading>Provide consent</Heading>
        <Box>
          <Paragraph>
            We want to get your consent to use your current geo-location data. Please note that by proceeding further you are providing your consent for data
            processing.
          </Paragraph>
          <ConsentContainer>
            <CheckBox
              isChecked={true}
              onPress={(isChecked) => {
                onCheckMarkChange(isChecked);
              }}
            />
            <Subtext>Yes, I do agree to share my geo-location data, while using the app.</Subtext>
          </ConsentContainer>
        </Box>

        {check && (
          // <Link to="/entrypage" style={{ textDecoration: "none" }} color={colors[0].white} component={GeneralButton}>
          //   {/* <GeneralButton>ok</GeneralButton> */}
          //   <Text>OK</Text>
          // </Link>
          <LinkButton to="/entrypage">OK</LinkButton>
        )}
      </Card>
    </LayoutRoot>
  );
};
