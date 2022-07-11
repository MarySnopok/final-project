import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
// import { useNavigate } from "react-router";
import { Card } from "../ui_fractions/Card";
import { SubmitButton } from "../ui_fractions/SubmitButton";
import { Heading } from "../ui_fractions/Heading";
// import { NavSection } from "../ui_fractions/NavSection";
import { Subtext } from "../ui_fractions/Subtext";
import { Input } from "../ui_fractions/Input";
import { ConsentContainer } from "../ui_fractions/ConsentContainer";
import user, { signInUser } from "../reducers/user";
import { LayoutFlex, LayoutNavbar, LayoutRoot } from "../ui_fractions/Layout";
import { HomeSvg } from "../ui_fractions/svg_components/HomeSvg";
import { CrossLinks } from "../ui_fractions/CrossLinks";
import { CommentsText } from "../ui_fractions/CommentsText";
import { ProfileSvg } from "../ui_fractions/svg_components/ProfileSvg";
import { HistorySvg } from "../ui_fractions/svg_components/HistorySvg";
import ui from "../reducers/ui";
import { Button } from "./UI/Button";
import { Space } from "./UI/Space";
import { appState } from "../reducers/app";

export const LogIn = () => {
  const [text, setChangeText] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [password, setPasswordChange] = useState("");
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    const { name, type, text } = event;
    let processedData = text;
    if (type === "text") {
      processedData = text;
    } else if (type === "number") {
      processedData = text;
    }
    // console.log("TEXT")
    setChangeText(processedData);
  };

  const handlePasswordChange = (event) => {
    const { name, type, text } = event;
    let newPassword = text;
    setPasswordChange(newPassword);
  };

  const onButtonPress = useCallback(async () => {
    console.log("login pressed");

    const payload = await dispatch(
      signInUser({ username: text, password: password })
    );
    setChangeText("");
    setPasswordChange("");
    console.log("pp", payload);
    if ((payload as any).error) {
      setLoginError(true);
    } else {
      dispatch(appState.actions.hideLogin());
    }
  }, [text, password]);

  const goToSingUp = useCallback(() => {
    dispatch(appState.actions.showSingUp());
  }, []);

  return (
    <LayoutRoot round>
      <Card>
        <View style={styles.contentBox}>
          <View style={{ flex: 1, flexShrink: 1 }}>
            <Heading>Login to Your Account</Heading>
            {loginError && (
              <View>
                <Text style={styles.extraText}>
                  Something went wrong during login, please try again
                </Text>
              </View>
            )}
            <Input
              name="username"
              placeholder={"username"}
              type="text"
              value={text}
              onChange={handleUsernameChange}
            />
            <Space />
            <Input
              name="password"
              placeholder={"password"}
              type="text"
              value={password}
              onChange={handlePasswordChange}
            />
            <Space />
            <View style={styles.loginButton}>
              <Button
                disabled={password.length <= 5 || text === ""}
                children={"login"}
                onPress={onButtonPress}
                stretch
              />
              {(password.length <= 5 || text === "") && (
                <Text style={styles.extraText}>
                  Please add your credentials.
                </Text>
              )}
            </View>
          </View>
          <View style={{ flex: 1, flexGrow: 1 }} />
          <View style={styles.bottomText}>
            <Text style={styles.extraText}>Don't have an account?</Text>
            {/* <CrossLinks routes={[{ title: "Sign Up", link: "/signup" }]} /> */}
            <Button onPress={goToSingUp}>Sing Up</Button>
          </View>
        </View>
      </Card>
    </LayoutRoot>
  );
};

const styles = StyleSheet.create({
  pic: {
    height: 20,
    width: 20,
  },
  loginButton: {
    // flexShrink: 1,
    // height: 40,
    // flexDirection: "row",
    // flex: 1,
    alignItems: "center",
  },
  extraText: {
    color: "white",
    margin: 4,
  },
  contentBox: {
    padding: 20,
    flex: 1,
  },
  bottomText: {
    alignItems: "center",
  },
});
