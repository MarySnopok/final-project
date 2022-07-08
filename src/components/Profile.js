import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { View, FlatList, StyleSheet } from "react-native";
import { LayoutFlex, LayoutNavbar, LayoutRoot } from "../ui_fractions/Layout";
import { Card } from "../ui_fractions/Card";
import { NavSection } from "../ui_fractions/NavSection";
import { distanceInKm, difficulty, duration } from "../utils/constants";
// import user, { getFavoriteRoutes } from "../src/reducers/user";
import { RouteListItem } from "./RouteListItem";
import { HomeSvg } from "../ui_fractions/svg_components/HomeSvg";
import { HistorySvg } from "../ui_fractions/svg_components/HistorySvg";
import { ProfileSvg } from "../ui_fractions/svg_components/ProfileSvg";
import { LogOutSvg } from "../ui_fractions/svg_components/LogOutSvg";
import colors from "../utils/colors.json";
import { UserProfileLogOut } from "../ui_fractions/UserProfileLogOut";
import { ProfilePicture } from "./ProfilePicture";
import { Button } from "./UI/Button";
import { ui } from '../reducers/ui';

export const Profile = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  // const favoriteRoutes = useSelector(getFavoriteRoutes);
  const dispatch = useDispatch();
  const onClsoe = useCallback(() => {
    dispatch(ui.actions.hideLogin());
  }, [dispatch])
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/signin");
  //   }
  // }, [accessToken, navigate]);

  return (
    <LayoutRoot>
      {/* <LayoutFlex> */}
        <Card>
          <UserProfileLogOut children={[{ title: <LogOutSvg color={colors[0].secondary} style={styles.large} />, link: "/logout" }]} />
          <ProfilePicture children={`Welcome ${username}!`} />
          {/* <View style={styles.container}>
            <FlatList
              data={favoriteRoutes}
              keyExtractor={(route) => route.id}
              renderItem={({ item: route }) => (
                <FavoriteRoute
                  route={route}
                  isChecked={false}
                  text={route.tags.name}
                  distance={distanceInKm(route)}
                  duration={duration(route)}
                  difficulty={difficulty(route)}
                  color={route.color}
                />
              )}
            />
          </View> */}
          <View style={{flex: 1}} />
          <View>
            <Button onPress={onClsoe}>Close</Button>
          </View>
        </Card>
      {/* </LayoutFlex>
      <LayoutNavbar>
        <NavSection
          routes={[
            { title: <HomeSvg color={"white"} style={styles.pic} />, link: "/entrypage" },
            { title: <ProfileSvg color={"white"} style={styles.pic} />, link: "/profile" },
            { title: <HistorySvg color={"white"} style={styles.pic} />, link: "/history" },
          ]}
        />
      </LayoutNavbar> */}
    </LayoutRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    margin: 8,
    alignItems: "stretch",
    justifyContent: "center",
    maxWidth: 400,
    width: "100%",
  },
  pic: {
    height: 20,
    width: 20,
  },
  large: {
    height: 24,
    width: 24,
  },
});
