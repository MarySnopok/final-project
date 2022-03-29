import { useSelector } from "react-redux";
import { Map } from "./Map";
import { NavSection } from "../ui_fractions/NavSection";
import { LayoutFlex, LayoutNavbar, LayoutRoot } from "../ui_fractions/Layout";
import { HistorySvg } from "../ui_fractions/svg_components/HistorySvg";
import { ProfileSvg } from "../ui_fractions/svg_components/ProfileSvg";
import { StyleSheet } from "react-native";
import { LogInSvg } from "../ui_fractions/svg_components/LogInSvg";
import { SignUpSvg } from "../ui_fractions/svg_components/SignUpSvg";

export const EntryPage = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  return (
    <>
      <LayoutRoot>
        <LayoutFlex>
          <Map />
        </LayoutFlex>
        <LayoutNavbar>
          <NavSection
            routes={
              !accessToken
                ? [
                    { title: <LogInSvg style={styles.pic} />, link: "/signin" },
                    { title: <SignUpSvg style={styles.pic} />, link: "/signup" },
                  ]
                : [
                    { title: <HistorySvg color={"white"} style={styles.pic} />, link: "/history" },
                    { title: <ProfileSvg style={styles.pic} />, link: "/profile" },
                  ]
            }
          />
        </LayoutNavbar>
      </LayoutRoot>
    </>
  );
};

const styles = StyleSheet.create({
  pic: {
    height: 20,
    width: 20,
  },
});
