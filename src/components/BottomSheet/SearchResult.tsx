import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

// import BackIcon from "../../assets/back.svg";
import BackIcon from "../../assets/xmark-solid.svg";

import { Button, IconButton } from "../UI/Button";
import ui from "../../reducers/ui";
import { isUserLoggedIn } from "../../reducers/user";
import { MiniAvatar } from "./MiniAvatar";
import { RouteListItem } from "../RouteListItem";
import { appState } from "../../reducers/app";
import { SearchResultScreen } from "../../types/app.types";

export const SearchResultLayout = ({
  screen,
}: {
  screen: SearchResultScreen;
}) => {
  const dispatch = useDispatch();
  // const onSearchNearBy = () => {
  //   // console.log("search nearby");
  //   dispatch(getNearByRoutes());
  // };

  const cancel = useCallback(() => {
    dispatch(appState.actions.popScreen());
  }, [dispatch]);

  // const isRoutesLoading = useSelector(state => state.routes.status === 'loading');


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
        <Text style={styles.headerTitle}>{screen.results.length} routes</Text>
      </View>
      <BottomSheetScrollView>
        {screen.results.map((route) => (
          <RouteListItem routeId={route} key={route} />
        ))}
        <View style={styles.searchMoreWrapper}>
          <Button onPress={() => console.log("search more")}>
            Extend search radius
          </Button>
        </View>
      </BottomSheetScrollView>
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
});
