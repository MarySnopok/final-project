import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { ExtraInfo } from "../../ui_fractions/ExtraInfo";
import { RoadSvg } from "../../ui_fractions/svg_components/RoadSvg";
import { ClockSvg } from "../../ui_fractions/svg_components/ClockSvg";
import { DumbellSvg } from "../../ui_fractions/svg_components/DumbellSvg";

// import BackIcon from "../../assets/back.svg";
import BackIcon from "../../assets/xmark-solid.svg";

import { Button, IconButton } from "../UI/Button";
import ui from "../../reducers/ui";
import { isUserLoggedIn } from "../../reducers/user";
import { MiniAvatar } from "./MiniAvatar";
import { RouteListItem } from "../RouteListItem";
import { RouteScreen } from "../../types/app.types";
import { appState } from "../../reducers/app";
import { getRouteById } from "../../reducers/routes";
import { calculateRouteParams, distanceInKm } from "../../utils/routeUtils";

export const RouteLayout = ({ screen }: { screen: RouteScreen }) => {
  const dispatch = useDispatch();
  const cancel = useCallback(() => {
    dispatch(appState.actions.popScreen());
  }, [dispatch]);
  // const cancel = useCallback(() => {
  //   dispatch(routes.actions.clearResult());
  // }, [dispatch]);

  // const isRoutesLoading = useSelector(state => state.routes.status === 'loading');

  const route = useSelector(getRouteById(screen.route));
  const { title, distance, duration, difficulty } = calculateRouteParams(route);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.back}>
          <IconButton
            onPress={cancel}
            icon={
              <BackIcon width={30} height={30} style={{ color: "black" }} />
            }
          />
        </View>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.favorite}>
          <IconButton
            onPress={cancel}
            icon={
              <BackIcon width={30} height={30} style={{ color: "black" }} />
            }
          />
        </View>
      </View>
      <View style={styles.iconsContainer}>
        {distance && (
          <View style={styles.iconWrapper}>
            <RoadSvg style={styles.pic} />
            <ExtraInfo data={distanceInKm(distance) ?? ""} comment={"km"} />
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
      <View>
        <Button onPress={() => console.log('go to route')}>Go to route</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // backgroundColor: "#aaf",
    paddingHorizontal: 20,
  },
  back: {
    position: "absolute",
    top: 0,
    right: -8,
  },
  favorite: {
    position: "absolute",
    top: 0,
    left: -8,
  },
  header: {
    height: 40,
    // backgroundColor: "#ffeeee",
    // flexDirection: "row",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
  },
  button: { flex: 1, marginRight: 18, paddingVertical: 4, marginLeft: 20 },
  userIcon: {
    marginRight: 10,
    width: 50,
  },
  searchMoreWrapper: {
    marginBottom: 20,
  },
  iconsContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    marginBottom: 8,
    height: 40,
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
