import { ExtraInfo } from "./ExtraInfo";
import { BinButton } from "./BinButton";
import { RoadSvg } from "./RoadSvg";
import { ClockSvg } from "./ClockSvg";
import { HikerSvg } from "./HikerSvg";
import { StyleSheet, View, Dimensions } from "react-native";
import colors from "../utils/colors.json";

export const FavoriteRoute = ({ text, distance, duration, difficulty }) => {
  //const
  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
        <ExtraInfo>{text}</ExtraInfo>
        <BinButton />
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
    marginTop: 8,
    borderRadius: 4,
    flexDirection: "column",
    // maxWidth: Dimensions.get("window").width,
  },
  container: {
    flex: 1,
    zIndex: 8,
    margin: 8,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  pic: {
    maxHeight: 20,
    maxWidth: 20,
  },
});
