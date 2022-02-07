import { ExtraInfo } from "./ExtraInfo";
import { BinButton } from "./BinButton";
import { RoadSvg } from "./RoadSvg";
import { ClockSvg } from "./ClockSvg";
import { HikerSvg } from "./HikerSvg";
import { StyleSheet, View, Dimensions } from "react-native";
import colors from "../utils/colors.json";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteFavorite } from "../reducers/user";
import { ActivityIndicator } from "react-native";

export const FavoriteRoute = ({ text, distance, duration, difficulty, id }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const deleteRoute = async () => {
    setLoading(true);
    await dispatch(deleteFavorite(id));
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
        <ExtraInfo>{text}</ExtraInfo>
        {loading ? <ActivityIndicator /> : <BinButton onPress={deleteRoute} />}
      </View>
      <View style={styles.container}>
        <ExtraInfo>
          <RoadSvg style={styles.pic} /> {distance}
        </ExtraInfo>
        <ExtraInfo>
          <ClockSvg style={styles.pic} /> {duration}
        </ExtraInfo>
        <ExtraInfo>
          <HikerSvg style={styles.pic} /> {difficulty}
        </ExtraInfo>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors[0].dark,
    borderColor: colors[0].white,
    borderWidth: 1,
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
