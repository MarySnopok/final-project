import { useState, useEffect } from "react";
import { Card } from "../ui_fractions/Card";
import { Heading } from "../ui_fractions/Heading";
import { NavSection } from "../ui_fractions/NavSection";
import { Subtext } from "../ui_fractions/Subtext";
import { Input } from "../ui_fractions/Input";
import { ConsentContainer } from "../ui_fractions/ConsentContainer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { LayoutFlex, LayoutNavbar, LayoutRoot } from "../ui_fractions/Layout";
import { StyleSheet } from "react-native";
import { signUpUser } from "../reducers/user";
import { HomeSvg } from "../ui_fractions/svg_components/HomeSvg";
import { CommentsText } from "../ui_fractions/CommentsText";
import { CrossLinks } from "../ui_fractions/CrossLinks";
import { SubmitButton } from "../ui_fractions/SubmitButton";
import { ProfileSvg } from "../ui_fractions/svg_components/ProfileSvg";
import { HistorySvg } from "../ui_fractions/svg_components/HistorySvg";

export const SignUp = () => {
  const [text, setChangeText] = useState("");
  const [password, setPasswordChange] = useState("");
  const [email, setEmailChange] = useState("");
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

  const handleEmailChange = (event) => {
    const { name, type, text } = event;
    let newEmail = text;
    setEmailChange(newEmail);
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/profile");
    }
  }, [accessToken, navigate]);

  const onButtonPress = async () => {
    setChangeText("");
    setPasswordChange("");
    setEmailChange("");
    await dispatch(signUpUser({ username: text, password, email }));
  };

  return (
    <LayoutRoot>
      <LayoutFlex>
        <Card>
          <Heading>Create Account</Heading>
          <Input name="username" placeholder={"username"} type="text" value={text} onChange={handleUsernameChange} />
          <Input name="password" placeholder={"password"} type="text" value={password} onChange={handlePasswordChange} />
          <Input name="email" placeholder={"email"} type="text" value={email} onChange={handleEmailChange} />
          {password.length >= 5 && text !== "" && email !== "" ? (
            <SubmitButton children={"sign up"} onPress={onButtonPress} />
          ) : (
            <>
              <SubmitButton disabled={true} children={"login"} onPress={onButtonPress} />
              <ConsentContainer>
                <Subtext>Password should be over 5 characters.</Subtext>
              </ConsentContainer>
            </>
          )}
          <ConsentContainer>
            <CommentsText>
              Already have an account?
              <CrossLinks routes={[{ title: "Login", link: "/signin" }]} />
            </CommentsText>
          </ConsentContainer>
        </Card>
      </LayoutFlex>
      <LayoutNavbar>
        <NavSection
          routes={[
            // navigate(-1) the same as going back
            { title: <HomeSvg color={"white"} style={styles.pic} />, link: "/entrypage" },
            { title: <ProfileSvg color={"white"} style={styles.pic} />, link: "/profile" },
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
  large: {
    height: 24,
    width: 24,
  },
});
