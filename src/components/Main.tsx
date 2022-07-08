import React, {
  useCallback,
  useState,
} from "react";
import { View, StyleSheet } from "react-native";
import { MapMain } from "./Map";

import BottomSheet from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";
import { Profile } from "./Profile";
import { useBottomLogic } from "./BottomSheet/useBottomLogic";
import { BottomLayout } from "./BottomSheet/BottomLayout";

export const Main = () => {
  const [bottomSheetRef, snapPoints, snapIndex, loading, onMapMove] =
    useBottomLogic();

  const [magicNumber, setMagicNumber] = useState(Math.random());
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index > 0) {
      setMagicNumber(Math.random());
    }
  }, []);

  const loginPage = useSelector((state) => state.app.loginPage);

  return (
    <View style={styles.main}>
      <MapMain magicNumber={magicNumber} onMove={onMapMove} />
      <BottomSheet
        ref={bottomSheetRef}
        index={snapIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <BottomLayout loading={loading} />
        </View>
      </BottomSheet>
      {loginPage === "login" && <LogIn />}
      {loginPage === "singUp" && <SignUp />}
      {loginPage === "profile" && (
        <PopupWrap>
          <Profile />
        </PopupWrap>
      )}
    </View>
  );
};

const PopupWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <View style={styles.popupWrap}>{children}</View>;
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
  popupWrap: {
    padding: 10,
    backgroundColor: "red",
    flex: 1,
  },
});
