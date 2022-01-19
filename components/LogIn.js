import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../ui_fractions/Card";

import { GeneralButton } from "../ui_fractions/GeneralButton";
import { Heading } from "../ui_fractions/Heading";
import { NavBar } from "../ui_fractions/NavBar";
import { NavButton } from "../ui_fractions/NavButton";
import { Subtext } from "../ui_fractions/Subtext";
import { Input } from "../ui_fractions/Input";
import { ConsentContainer } from "../ui_fractions/ConsentContainer";

import colors from "../utils/colors.json";

export const LogIn = () => {
  const [text, onChangeText] = useState("");
  const [password, onPasswordChange] = useState("");

  const handleUsernameChange = (event) => {
    const { name, type, text } = event;
    let processedData = text;
    if (type === "text") {
      processedData = text;
    } else if (type === "number") {
      processedData = text;
    }
    onChangeText(processedData);
  };
  const handlePasswordChange = (event) => {
    const { name, type, text } = event;
    let newPassword = text;
    if (newPassword.length >= 5) {
    } else if (newPassword.length < 5) {
      console.log("too short");
    }
    onPasswordChange(newPassword);
  };
  console.log("text", text);
  console.log("password", password);
  return (
    <>
      <Card>
        <Heading>Log In</Heading>
        <Input name="username" placeholder={"username"} type="text" value={text} onChange={handleUsernameChange} />
        <Input name="password" placeholder={"password"} type="text" value={password} onChange={handlePasswordChange} />
        {password.length >= 5 && text !== "" ? (
          <Link to="/*" style={{ textDecoration: "none" }} color={colors[0].font}>
            <GeneralButton children={"submit"} />
          </Link>
        ) : (
          <ConsentContainer>
            <Subtext>please add your credentials.</Subtext>
          </ConsentContainer>
        )}
      </Card>
      <NavBar>
        <Link to="/entrypage" style={{ textDecoration: "none" }} color={colors[0].font}>
          <NavButton children={"back"} />
        </Link>
        <Link to="/signup" style={{ textDecoration: "none" }} color={colors[0].font}>
          <NavButton children={"sign up"} />
        </Link>
      </NavBar>
    </>
  );
};
