import { ExtraInfo } from "../ui_fractions/ExtraInfo";
import { BinButton } from "../ui_fractions/BinButton";
import { RoadSvg } from "../ui_fractions/RoadSvg";
import { ClockSvg } from "../ui_fractions/ClockSvg";
import { DumbellSvg } from "../ui_fractions/DumbellSvg";
import { StyleSheet, View, Dimensions } from "react-native";
import colors from "../utils/colors.json";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteFavorite } from "../reducers/user";
import { ActivityIndicator, TouchableHighlight } from "react-native";
import { pickRandomBackground } from "../utils/constants";

export const FavoriteRoute = ({ text, distance, duration, difficulty, id }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const deleteRoute = async () => {
    setLoading(true);
    await dispatch(deleteFavorite(id));
  };

  return (
    <TouchableHighlight flex={0.5}>
      <View style={styles.maincontainer}>
        <View style={styles.container}>
          <ExtraInfo>{text}</ExtraInfo>
          {loading ? <ActivityIndicator /> : <BinButton onPress={deleteRoute} />}
        </View>
        <View style={styles.container}>
          {distance && (
            <ExtraInfo>
              <RoadSvg style={styles.pic} /> {distance}km
            </ExtraInfo>
          )}
          {duration && (
            <ExtraInfo>
              <ClockSvg style={styles.pic} /> {duration}hr
            </ExtraInfo>
          )}
          <ExtraInfo>
            <DumbellSvg style={styles.pic} /> {difficulty}
          </ExtraInfo>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: pickRandomBackground(),
    borderColor: pickRandomBackground(),
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 8,
    borderRadius: 4,
    flexDirection: "column",
    width: Dimensions.get("window").width - 20,
    maxWidth: Dimensions.get("window").width,
  },

  container: {
    zIndex: 8,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  pic: {
    height: 20,
    width: 20,
  },
});
