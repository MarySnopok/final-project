import React from "react";
import { Heading } from "../ui_fractions/Heading";
import { LayoutFlex, LayoutNavbar, LayoutRoot } from "../ui_fractions/Layout";
import { NavSection } from "../ui_fractions/NavSection";
import { HomeSvg } from "../ui_fractions/svg_components/HomeSvg";
import { StyleSheet } from "react-native";

export const NotFound = () => {
  return (
    <LayoutRoot>
      <LayoutFlex>
        <Heading children={"Not found"} />
      </LayoutFlex>
      <LayoutNavbar>
        <NavSection routes={[{ title: <HomeSvg style={styles.pic} />, link: "/entrypage" }]} />
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
