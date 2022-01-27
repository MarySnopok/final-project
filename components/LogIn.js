import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui_fractions/Card";
import { GeneralButton } from "../ui_fractions/GeneralButton";
import { Heading } from "../ui_fractions/Heading";
import { NavSection } from "../ui_fractions/NavSection";
import { Subtext } from "../ui_fractions/Subtext";
import { Input } from "../ui_fractions/Input";
import { ConsentContainer } from "../ui_fractions/ConsentContainer";

import { API_URL } from "../utils/constants";
import user from "../reducers/user";

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
    if (newPassword.length >= 5) {
    } else if (newPassword.length < 5) {
      console.log("too short");
    }
    setPasswordChange(newPassword);
  };
  console.log("text", text);
  console.log("password", password);

  useEffect(() => {
    if (accessToken) {
      navigate("/profile");
    }
  }, [accessToken, navigate]);

  const onButtonPress = () => {
    console.log("login pressed");
    setChangeText("");
    setPasswordChange("");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: text, password: password }),
    };
    fetch(API_URL("signin"), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
        }
      });
  };

  return (
    <>
      <Card>
        <Heading>Log In</Heading>
        <Input name="username" placeholder={"username"} type="text" value={text} onChange={handleUsernameChange} />
        <Input name="password" placeholder={"password"} type="text" value={password} onChange={handlePasswordChange} />
        {password.length >= 5 && text !== "" ? (
          <GeneralButton children={"submit"} onPress={onButtonPress} />
        ) : (
          <ConsentContainer>
            <Subtext>please add your credentials.</Subtext>
          </ConsentContainer>
        )}
      </Card>
      <NavSection
        routes={[
          { title: "back", link: "/entrypage" },
          { title: "sign up", link: "/signup" },
        ]}
      />
    </>
  );
};
