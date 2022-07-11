import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import { Button, IconButton } from "../UI/Button";
import ui from "../../reducers/ui";
import { isUserLoggedIn } from "../../reducers/user";
import { MiniAvatar } from "./MiniAvatar";
import { searchNearByRoutes } from "../../reducers/app";
import { RouteListItem } from "../RouteListItem";
import { Heading } from "../../ui_fractions/Heading";
import { Headline } from "../UI/Headline";

export const HomeLayout = () => {
  const dispatch = useDispatch();
  const onSearchNearBy = () => {
    // console.log("search nearby");
    dispatch(searchNearByRoutes());
  };

  const favorite = useSelector((state) => state.user.favorite);
  // const favorite = [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.button}>
          <Button onPress={onSearchNearBy}>Search nearby</Button>
        </View>
        <View style={styles.userIcon}>
          <MiniAvatar />
        </View>
      </View>
      {/*
      <View>
        <Text>or</Text>
        <View>
          <Text>Search for whatever</Text>
        </View>
      </View>
  */}
      {/* <View> */}
      <BottomSheetScrollView style={{paddingHorizontal: 20}}>
        <View>
          <Headline style={{color: '#666666'}}>Favorite routes</Headline>
        </View>
        {favorite.map((route) => (
          <RouteListItem routeId={route} key={route} />
        ))}
      </BottomSheetScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // backgroundColor: "#aaf",
  },
  header: {
    height: 50,
    // backgroundColor: "#ffeeee",
    flexDirection: "row",
    alignItems: "center",
  },
  button: { flex: 1, marginRight: 18, paddingVertical: 4, marginLeft: 20 },
  userIcon: {
    marginRight: 10,
    width: 50,
  },
});
