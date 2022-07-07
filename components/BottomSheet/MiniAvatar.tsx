import { useCallback } from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../../assets/user-solid.svg";
import ui from "../../reducers/ui";
import { getUserAvatar, isUserLoggedIn } from "../../reducers/user";
import { IconButton } from "../UI/Button";

export const MiniAvatar = ({size = 'm'}: {size?: 'm' | 'l'}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isUserLoggedIn);
  const avatar = useSelector(getUserAvatar);
  const onAvatarClick = useCallback(() => {
    dispatch(isLoggedIn ? ui.actions.showProfile() : ui.actions.showLogin());
  }, []);

  if (avatar) {
    console.log('show avatar');
    return <TouchableOpacity style={[styles.avatarWrap, styles[`avatarWrap-${size}`]]} onPress={onAvatarClick}>
        <Image style={[styles.avatar, styles[`avatar-${size}`]]} source={{ uri: avatar }} />
    </TouchableOpacity>
  }

  return (
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
  );
};

const styles = StyleSheet.create({
    avatar: {
        borderWidth: 2,
        borderColor: 'white',
    },
    avatarWrap: {
        borderWidth: 1,
        borderColor: '#888888',
        justifyContent: 'center',
        alignItems: 'center'
    },
    'avatar-m': {
        width: 38,
        height: 38,
        borderRadius: 16,
    },
    'avatarWrap-m': {
        height: 42,
        width: 42,
        borderRadius: 21,
    },
    'avatar-l': {
        width: 56,
        height: 56,
        borderRadius: 56 / 2,
    },
    'avatarWrap-l': {
        height: 60,
        width: 60,
        borderRadius: 30,
    }
})