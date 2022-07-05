import { useCallback, useEffect, useMemo, useRef } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Map } from "./Map";

import BottomSheet from "@gorhom/bottom-sheet";
import { MainBottomLayout } from "./BottomSheet";
import { useSelector } from "react-redux";
import { LogIn } from "./LogIn";
import { LogOut } from "./Logout";
import { SignUp } from "./SignUp";

export const Main = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const loginPage = useSelector((state) => state.ui.loginPage);

  useEffect(() => {
    if (loginPage) {
      bottomSheetRef.current?.close();
    } else {
      bottomSheetRef.current?.expand();
    }
  }, [loginPage]);

  return (
    <View style={styles.main}>
      <Map />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <MainBottomLayout />
        </View>
      </BottomSheet>
      {loginPage === "login" && <LogIn />}
      {loginPage === "singUp" && <SignUp />}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "#00ffff",
  },
});
