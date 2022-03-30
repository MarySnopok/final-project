import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { View, FlatList, StyleSheet } from "react-native";
import { LayoutFlex, LayoutNavbar, LayoutRoot } from "../ui_fractions/Layout";
import { Card } from "../ui_fractions/Card";
import { Heading } from "../ui_fractions/Heading";
import { NavSection } from "../ui_fractions/NavSection";
import { distanceInKm, difficulty, duration } from "../utils/constants";
import user, { getFavoriteRoutes } from "../reducers/user";
import { FavoriteRoute } from "./FavoriteRoute";
import { HomeSvg } from "../ui_fractions/svg_components/HomeSvg";
import { HistorySvg } from "../ui_fractions/svg_components/HistorySvg";
import { ProfileSvg } from "../ui_fractions/svg_components/ProfileSvg";

export const Profile = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const favoriteRoutes = useSelector(getFavoriteRoutes);
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
          <Heading>{username}'s favorite routes:</Heading>
          <View style={styles.container}>
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
          </View>
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
