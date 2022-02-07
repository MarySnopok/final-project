import React, { useState } from "react";
import { useNavigate } from "react-router";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import colors from "../utils/colors.json";
import { ConsentContainer } from "../ui_fractions/ConsentContainer";
import { FavButton } from "../ui_fractions/FavButton";
import { pickRandomBackground } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteRoutes, isRouteFavorite, saveFavorite } from "../reducers/user";
import { ActivityIndicator } from "react-native";

export const RouteCard = ({ route, color }) => {
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
    <View key={route.tags.name} style={[styles.slideContainer, styles.slide1, { backgroundColor: color }]}>
      <ConsentContainer style={{ alignItems: "stretch", justifyContent: "space-between" }}>
        <Text style={styles.typography}>{route.tags.name}</Text>
        {loadingSaveFavorite ? <ActivityIndicator /> : isFavorite ? <Text>Already favorite</Text> : <FavButton onPress={addToFavorite} />}
      </ConsentContainer>
      <View style={styles.detailsWrapper}>
        {route.tags.route && <Text style={styles.details}>{route.tags.route} trail</Text>}
        {route.tags.distance && <Text style={styles.details}>{parseInt(route.tags.distance, 10)} km</Text>}
        {route.tags.distance && <Text style={styles.details}>{Math.round(parseInt(route.tags.distance, 10) / 6)} hr</Text>}
        {route.tags.distance && parseInt(route.tags.distance, 10) >= 12 ? (
          <Text style={styles.details}>high difficulty</Text>
        ) : (
          <Text style={styles.details}>moderate difficulty</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 2,
    left: 2,
    right: 2,
    height: "30%",
    alignItems: "stretch",
    justifyContent: "flex-start",
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  typography: {
    padding: 8,
    marginVertical: 18,
    marginHorizontal: 8,
    color: colors[0].dark,
    fontSize: 18,
    lineHeight: 20,
    zIndex: 12,
    textAlign: "center",
  },
  detailsWrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 18,
  },
  details: {
    paddingTop: 4,
    color: colors[0].dark,
    fontSize: 16,
    zIndex: 12,
  },
  slide1: {
    backgroundColor: pickRandomBackground(),
  },
  slide2: {
    backgroundColor: pickRandomBackground(),
  },
  slide3: {
    backgroundColor: pickRandomBackground(),
  },
});
