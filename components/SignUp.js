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

export const SignUp = () => {
  const [text, onChangeText] = useState("");
  const [password, onPasswordChange] = useState("");
  const [email, onEmailChange] = useState("");

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

  const handleEmailChange = (event) => {
    const { name, type, text } = event;
    let newEmail = text;
    onEmailChange(newEmail);
  };

  console.log("text", text);
  console.log("password", password);
  console.log("email", email);
  return (
    <>
      <Card>
        <Heading>Sign Up</Heading>
        <Input name="username" placeholder={"username"} type="text" value={text} onChange={handleUsernameChange} />
        <Input name="password" placeholder={"password"} type="text" value={password} onChange={handlePasswordChange} />
        <Input name="email" placeholder={"email"} type="text" value={email} onChange={handleEmailChange} />
        {password.length >= 5 && text !== "" && email !== "" ? (
          <Link to="/*" style={{ textDecoration: "none" }} color={colors[0].font}>
            <GeneralButton children={"submit"} />
          </Link>
        ) : (
          <ConsentContainer>
            <Subtext>password should be over 5 characters.</Subtext>
          </ConsentContainer>
        )}
      </Card>
      <NavBar>
        <Link to="/entrypage" style={{ textDecoration: "none" }} color={colors[0].font}>
          <NavButton children={"back"} />
        </Link>
        <Link to="/signin" style={{ textDecoration: "none" }} color={colors[0].font}>
          <NavButton children={"log in"} />
        </Link>
      </NavBar>
    </>
  );
};
