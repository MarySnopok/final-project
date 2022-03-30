import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Card } from "../ui_fractions/Card";
import { SubmitButton } from "../ui_fractions/SubmitButton";
import { Heading } from "../ui_fractions/Heading";
import { NavSection } from "../ui_fractions/NavSection";
import { Subtext } from "../ui_fractions/Subtext";
import { Input } from "../ui_fractions/Input";
import { ConsentContainer } from "../ui_fractions/ConsentContainer";
import user, { signInUser } from "../reducers/user";
import { LayoutFlex, LayoutNavbar, LayoutRoot } from "../ui_fractions/Layout";
import { StyleSheet } from "react-native";
import { HomeSvg } from "../ui_fractions/svg_components/HomeSvg";
import { CrossLinks } from "../ui_fractions/CrossLinks";
import { CommentsText } from "../ui_fractions/CommentsText";
import { ProfileSvg } from "../ui_fractions/svg_components/ProfileSvg";
import { HistorySvg } from "../ui_fractions/svg_components/HistorySvg";

export const LogIn = () => {
  const [text, setChangeText] = useState("");
  const [password, setPasswordChange] = useState("");
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    const { name, type, text } = event;
    let processedData = text;
    if (type === "text") {
      processedData = text;
    } else if (type === "number") {
      processedData = text;
    }
    setChangeText(processedData);
  };

  const handlePasswordChange = (event) => {
    const { name, type, text } = event;
    let newPassword = text;
    setPasswordChange(newPassword);
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/profile");
    }
  }, [accessToken, navigate]);

  const onButtonPress = async () => {
    console.log("login pressed");
    setChangeText("");
    setPasswordChange("");
    await dispatch(signInUser({ username: text, password: password }));
  };

  return (
    <LayoutRoot>
      <LayoutFlex>
        <Card>
          <Heading>Login to Your Account</Heading>
          <Input name="username" placeholder={"username"} type="text" value={text} onChange={handleUsernameChange} />
          <Input name="password" placeholder={"password"} type="text" value={password} onChange={handlePasswordChange} />
          {password.length >= 5 && text !== "" ? (
            <SubmitButton children={"login"} onPress={onButtonPress} />
          ) : (
            <>
              <SubmitButton disabled={true} children={"login"} onPress={onButtonPress} />
              <ConsentContainer>
                <Subtext>Please add your credentials.</Subtext>
              </ConsentContainer>
            </>
          )}
          <ConsentContainer>
            <CommentsText>
              Don't have an account?
              <CrossLinks routes={[{ title: "Sign Up", link: "/signup" }]} />
            </CommentsText>
          </ConsentContainer>
        </Card>
      </LayoutFlex>

      <LayoutNavbar>
        <NavSection
          routes={[
            // navigate(-1) the same as going back
            { title: <HomeSvg style={styles.pic} />, link: "/entrypage" },
            { title: <ProfileSvg style={styles.pic} />, link: "/profile" },
            { title: <HistorySvg color={"white"} style={styles.pic} />, link: "/history" },
          ]}
        />
      </LayoutNavbar>
    </LayoutRoot>
  );
};

const styles = StyleSheet.create({
  pic: {
    height: 20,
    width: 20,
  },
});
