import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

// import BackIcon from "../../assets/back.svg";

import { Button, IconButton } from "../UI/Button";
import ui from "../../reducers/ui";
import { isUserLoggedIn } from "../../reducers/user";
import { MiniAvatar } from "./MiniAvatar";
import { RouteListItem } from "../RouteListItem";

export const LoadingLayout = () => {
  return (
    <View style={styles.container}>
      <Text>Loading</Text>
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
