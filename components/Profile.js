import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from "react-native";
import { LayoutFlex, LayoutNavbar, LayoutRoot } from "../ui_fractions/Layout";
import { Card } from "../ui_fractions/Card";
import { Heading } from "../ui_fractions/Heading";
import { NavSection } from "../ui_fractions/NavSection";
import { distanceInKm, difficulty, duration } from "../utils/constants";
import colors from "../utils/colors.json";

import user, { fetchProfile, getFavoriteRoutes } from "../reducers/user";
import { FavoriteRoute } from "./FavoriteRoute";

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
                  id={route.id}
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
            { title: "home", link: "/entrypage" },
            { title: "history", link: "/history" },
            { title: "log out", link: "/logout" },
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
});
