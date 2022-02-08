import React, { useState } from "react";
import { useNavigate } from "react-router";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import colors from "../utils/colors.json";
import { ConsentContainer } from "../ui_fractions/ConsentContainer";
import { FavButton } from "../ui_fractions/FavButton";
import { pickRandomBackground } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { isRouteFavorite, saveFavorite } from "../reducers/user";
import { ActivityIndicator } from "react-native";

import { RouteDetails } from "./RouteDetails";

export const RouteCard = ({ route }) => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const [loadingSaveFavorite, setLoadingSaveFavorite] = useState(false);
  const navigate = useNavigate();

  const isFavorite = useSelector(isRouteFavorite(route.id));

  const addToFavorite = async () => {
    if (!accessToken) {
      // TODO: add route to favorites once we authorized,
      // not implemented now
      navigate("/signin");
    } else {
      setLoadingSaveFavorite(true);
      await dispatch(saveFavorite(route));
      setLoadingSaveFavorite(false);
    }
  };

  return (
    <View key={route.tags.name} style={[styles.slideContainer, styles.slide1, { backgroundColor: route.color }]}>
      <ConsentContainer style={{ alignItems: "stretch", justifyContent: "space-between" }}>
        <Text style={styles.typography}>{route.tags.name}</Text>
        {loadingSaveFavorite ? <ActivityIndicator /> : isFavorite ? <Text>Already favorite</Text> : <FavButton onPress={addToFavorite} />}
      </ConsentContainer>
      <RouteDetails route={route} />
    </View>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  typography: {
    padding: 8,
    marginHorizontal: 4,
    color: colors[0].dark,
    fontSize: 18,
    lineHeight: 20,
    zIndex: 12,
    textAlign: "center",
  },
  slide1: {
    backgroundColor: pickRandomBackground(),
  },
});
