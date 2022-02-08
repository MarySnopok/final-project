import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ConsentContainer } from "../ui_fractions/ConsentContainer";
import { Card } from "../ui_fractions/Card";
import { Box } from "../ui_fractions/Box";
import { Paragraph } from "../ui_fractions/Paragraph";
import { Subtext } from "../ui_fractions/Subtext";
import { Heading } from "../ui_fractions/Heading";
import { CheckBox } from "../ui_fractions/CheckBox";
import { LayoutRoot } from "../ui_fractions/Layout";
import user from "../reducers/user";
import { LinkButton } from "../ui_fractions/LinkButton";

// import * as Location from "expo-location";

export const Consent = () => {
  const [check, onCheckMarkChange] = useState(true);

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

        {check && <LinkButton to="/entrypage">OK</LinkButton>}
      </Card>
    </LayoutRoot>
  );
};
