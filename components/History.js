import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { StyleSheet } from "react-native";
import { SubHeading } from "../ui_fractions/SubHeading";
import { Card } from "../ui_fractions/Card";
import { NavSection } from "../ui_fractions/NavSection";
import { LayoutFlex, LayoutNavbar, LayoutRoot } from "../ui_fractions/Layout";
import { HomeSvg } from "../ui_fractions/svg_components/HomeSvg";
import { ProfileSvg } from "../ui_fractions/svg_components/ProfileSvg";
import { HistorySvg } from "../ui_fractions/svg_components/HistorySvg";

export const History = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
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
          <SubHeading>Stay tuned!</SubHeading>
        </Card>
      </LayoutFlex>
      <LayoutNavbar>
        <NavSection
          routes={[
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
  container: {
    flex: 0.8,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  pic: {
    height: 20,
    width: 20,
  },
});
