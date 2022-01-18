// import { Map } from "./components/Map";
import React, { useState } from "react";
import { Card } from "./ui_fractions/Card";
import { NavBar } from "./ui_fractions/NavBar";
import { Box } from "./ui_fractions/Box";
// import { Paragraph } from "./ui_fractions/Paragraph";
import { Heading } from "./ui_fractions/Heading";
import { GeneralButton } from "./ui_fractions/Button";
import { NavButton } from "./ui_fractions/NavButton";
import { PressTag } from "./ui_fractions/Tags";
// import { Input } from "./ui_fractions/Input";

// import colors from "./utils/colors.json";

// import { Text } from "react-native";

export default function App() {
  const [text, onChangeText] = useState("Useless Text");
  console.log("text from inout", text);

  const handleChange = (event) => {
    const { name, type, text } = event;
    let processedData = text;
    if (type === "text") {
      processedData = text;
    } else if (type === "number") {
      processedData = text;
    }
    onChangeText(processedData);
  };
  return (
    <>
      <Card>
        <Heading children={"LogIn"} />
        <Box>
          {/* <Input onChangeText={(text) => onChangeText(text)} placeholder={"username"} value={text} defaultValue={text}></Input> */}
          {/* <Input name="username" type="text" value={text} onChange={handleChange} /> */}
          {/* <Paragraph children={"This is the text that will be represented as a paragrapth"} /> */}
          <PressTag children={"Near me"} />
        </Box>
        <Box>
          {/* <Paragraph children={"This is the text that will be represented as a paragrapth"} /> */}
          <PressTag children={"Near me"} />
        </Box>
        <GeneralButton children={"submit"} />
      </Card>

      <NavBar>
        <NavButton children={"HOME"} />
        <NavButton children={"Profile"} />
        <NavButton children={"history"} />
      </NavBar>

      {/* <Map /> */}
    </>
  );
}
