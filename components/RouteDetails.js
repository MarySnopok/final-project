import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../utils/colors.json";
import { distanceInKm, distanceRowData, duration, difficulty } from "../utils/constants";
import { DumbellSvg } from "../ui_fractions/DumbellSvg";
import { ClockSvg } from "../ui_fractions/ClockSvg";
import { RoadSvg } from "../ui_fractions/RoadSvg";
import { HikerSvg } from "../ui_fractions/HikerSvg";

export const RouteDetails = ({ route }) => {
  return (
    <View style={styles.detailsWrapper}>
      <View style={styles.hikeWrapper}>
        <HikerSvg style={styles.pic} />
        <Text style={styles.details}>hiking</Text>
      </View>

      {distanceRowData(route) && (
        <View style={styles.hikeWrapper}>
          <RoadSvg style={styles.pic} />
          <Text style={styles.details}>{distanceInKm(route)}km</Text>
        </View>
      )}
      {distanceRowData(route) && (
        <View style={styles.hikeWrapper}>
          <ClockSvg style={styles.pic} />
          <Text style={styles.details}>{duration(route)}hr</Text>
        </View>
      )}

      <View style={styles.hikeWrapper}>
        <DumbellSvg style={styles.pic} />
        <Text style={styles.details}>{difficulty(route)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsWrapper: {
    alignItems: "center",
    justifyContent: "space-around",
    fontSize: 18,
    flexDirection: "row",
  },
  hikeWrapper: {
    flexDirection: "column",
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    paddingTop: 4,
    color: colors[0].dark,
    fontSize: 16,
    zIndex: 12,
  },
  pic: {
    width: 20,
    height: 20,
  },
});
