import { ExtraInfo } from "../ui_fractions/ExtraInfo";
import { BinButton } from "../ui_fractions/BinButton";
import { RoadSvg } from "../ui_fractions/RoadSvg";
import { ClockSvg } from "../ui_fractions/ClockSvg";
import { DumbellSvg } from "../ui_fractions/DumbellSvg";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteFavorite } from "../reducers/user";
import { ActivityIndicator, TouchableHighlight } from "react-native";
import { pickRandomBackground } from "../utils/constants";
// import { useNavigate } from "react-router";

export const FavoriteRoute = ({ text, distance, duration, difficulty, id, color }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
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
          <ExtraInfo data={text} />
          {loading ? <ActivityIndicator /> : <BinButton onPress={deleteRoute} />}
        </View>
        <View style={styles.iconsContainer}>
          {distance && (
            <View style={styles.iconWrapper}>
              <RoadSvg style={styles.pic} />
              <ExtraInfo data={distance} comment={"km"} />
            </View>
          )}
          {duration && (
            <View style={styles.iconWrapper}>
              <ClockSvg style={styles.pic} />
              <ExtraInfo data={duration} comment={"hr"} />
            </View>
          )}
          <View style={styles.iconWrapper}>
            <DumbellSvg style={styles.pic} />
            <ExtraInfo data={difficulty} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
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
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 0,
  },
  iconsContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    marginBottom: 8,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  pic: {
    height: 20,
    width: 20,
  },
});
