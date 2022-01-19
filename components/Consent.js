import { useState } from "react";
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

export const Consent = () => {
  const [check, onCheckMarkChange] = useState(true);

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
        </Box>
        <ConsentContainer>
          <BouncyCheckbox
            size={25}
            isChecked={true}
            fillColor={colors[0].primary}
            unfillColor={colors[0].white}
            iconStyle={{ borderColor: colors[0].primary }}
            textStyle={{ fontFamily: "JosefinSans-Regular" }}
            onPress={(isChecked) => {
              onCheckMarkChange(isChecked);
            }}
          />
          <Subtext>Yes, I do agree to share my geo-location data, while using the app.</Subtext>
        </ConsentContainer>
        {check && (
          <Link to="/entrypage" style={{ textDecoration: "none" }} color={colors[0].white}>
            <GeneralButton children={"ok"} />
          </Link>
        )}
      </Card>
    </>
  );
};
