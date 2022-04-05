import React, { useState, useEffect } from "react";
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import colors from "../utils/colors.json";
import { useDispatch, useSelector } from "react-redux";
import user, { saveUserProfilePicture } from "../reducers/user";

export const PicturePicker = () => {
  const profilePicture = useSelector((state) => state.user.userImage);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Please grant camera roll permissions inside your system's settings");
    } else {
      console.log("Media Permissions are granted");
    }
  };

  const addImage = async () => {
    checkForCameraRollPermission();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(JSON.stringify(result));
    if (!result.cancelled) {
      //setImage(result.uri);
      console.log(result);
      dispatch(saveUserProfilePicture(result.uri));
    }
  };

  /*
  const addUserPicture = async () => {
    if (image) {
      await dispatch(saveUserProfilePicture(image));
    } else {
      await dispatch(saveUserProfilePicture(null));
    }
  };

  useEffect(() => {
    addUserPicture();
  }, [image]);
  */

  return (
    <View style={imageUploaderStyles.container}>
      {profilePicture && <Image source={{ uri: profilePicture }} style={{ width: 180, height: 180 }} />}

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn}>
          <Text>{image ? "Edit" : "Upload"} Image</Text>
          <AntDesign name="camera" size={20} color={colors[0].dark} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 180,
    width: 180,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
    borderColor: colors[0].white,
    borderWidth: 2,
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
