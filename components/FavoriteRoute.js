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
import { useNavigate } from "react-router";

export const FavoriteRoute = ({ text, distance, duration, difficulty, id, color }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteRoute = async () => {
    setLoading(true);
    await dispatch(deleteFavorite(id));
  };

  // const onPress = () => {
  //   navigate(`/entrypage/${id}`);
  // };

  return (
    <TouchableHighlight>
      <View style={[styles.maincontainer, { backgroundColor: color }]}>
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
    // backgroundColor: pickRandomBackground(),
    borderColor: pickRandomBackground(),
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 8,
    borderRadius: 4,
    flexDirection: "column",
    alignSelf: "stretch",
    width: "auto",
  },

  container: {
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
