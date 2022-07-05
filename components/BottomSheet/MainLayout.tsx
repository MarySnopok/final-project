import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";

import { Button, IconButton } from "../UI/Button";
import Profile from "../../assets/user-solid.svg";
import ui from "../../reducers/ui";

export const MainBottomLayout = () => {
  const onSearchNearBy = () => {
    console.log("search nearby");
  };
  const dispatch = useDispatch();
  const onAvatarClick = useCallback(() => {
    dispatch(ui.actions.showLogin());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.button}>
          <Button onPress={onSearchNearBy}>Search nearby</Button>
        </View>
        <View style={styles.userIcon}>
          <IconButton
            withBorder
            icon={
              <Profile
                width={28}
                height={28}
                color="white"
                style={{ color: "darkgray" }}
              />
            }
            onPress={onAvatarClick}
          />
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
