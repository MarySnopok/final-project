import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { View, StyleSheet } from "react-native";
import { SubHeading } from "../ui_fractions/SubHeading";
import { Card } from "../ui_fractions/Card";
import { Heading } from "../ui_fractions/Heading";
import { NavSection } from "../ui_fractions/NavSection";
import { LayoutFlex, LayoutNavbar, LayoutRoot } from "../ui_fractions/Layout";

import user from "../reducers/user";
import { FavoriteRoute } from "./FavoriteRoute";

export const History = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  return (
    <LayoutRoot>
      <LayoutFlex>
        <Card>
          <Heading>History</Heading>
          <SubHeading>Stay tuned! There will be plenty of useful stats available soon...</SubHeading>
        </Card>
      </LayoutFlex>
      <LayoutNavbar>
        <NavSection
          routes={[
            { title: "home", link: "/entrypage" },
            { title: "profile", link: "/profile" },
            { title: "log out", link: "/" },
          ]}
        />
      </LayoutNavbar>
    </LayoutRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
