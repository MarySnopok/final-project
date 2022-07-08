import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";

import { Button, IconButton } from "../UI/Button";
import ui from "../../reducers/ui";
import { isUserLoggedIn } from "../../reducers/user";
import { MiniAvatar } from "./MiniAvatar";
import { searchNearByRoutes } from '../../reducers/app';

export const HomeLayout = () => {
  const dispatch = useDispatch();
  const onSearchNearBy = () => {
    // console.log("search nearby");
    dispatch(searchNearByRoutes());
  };

  const isRoutesLoading = useSelector(state => state.routes.status === 'loading');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.button}>
          <Button loading={isRoutesLoading} onPress={onSearchNearBy}>Search nearby</Button>
        </View>
        <View style={styles.userIcon}>
          <MiniAvatar />
        </View>
      </View>
      <View>
        <Text>or</Text>
        <View>
          <Text>Search for whatever</Text>
        </View>
      </View>
      <View>
        <Text>Login to see favorite</Text>
      </View>
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
