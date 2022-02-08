import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { View, StyleSheet } from "react-native";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    } else {
      console.log("try dispatch something");
      dispatch(fetchProfile());
    }
  }, [accessToken, navigate]);

  //   useEffect(() => {
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         Authorization: accessToken,
  //       },
  //     };

  //     fetch(API_URL("profile"), options)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.success) {
  //           dispatch(thoughts.actions.setItems(data.response));
  //           dispatch(thoughts.actions.setError(null));
  //         } else {
  //           dispatch(thoughts.actions.setItems([]));
  //           dispatch(thoughts.actions.setError(data.response));
  //         }
  //       });
  //   }, [accessToken, dispatch]);

  return (
    <LayoutRoot>
      <LayoutFlex>
        <Card>
          <Heading>{username}'s favorite routes:</Heading>
          <View style={styles.container}>
            {favoriteRoutes.map((route) => (
              <FavoriteRoute
                key={route.id}
                id={route.id}
                isChecked={false}
                text={route.tags.name}
                distance={distanceInKm(route)}
                duration={duration(route)}
                difficulty={difficulty(route)}
              />
            ))}
          </View>
        </Card>
      </LayoutFlex>
      <LayoutNavbar>
        <NavSection
          routes={[
            { title: "home", link: "/entrypage" },
            { title: "history", link: "/history" },
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
