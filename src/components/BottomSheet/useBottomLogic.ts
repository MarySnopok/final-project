import React, { useCallback, useEffect, useMemo, useRef } from "react";

import BottomSheet from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { SearchResultLayout } from "./SearchResult";
import { getCurrentScreen } from "../../reducers/app";
import { PossibleScreens } from "../../types/app.types";
import { View } from "react-native";
import { RouteLayout } from "./RouteLayout";
import { LoadingLayout } from "./LoadingLayout";

const ON_LOADING_SNAP = ["10%", "10%"];

export const useBottomLogic = (): [
  ref: React.RefObject<BottomSheet>,
  snapPoints: string[],
  snapIndex: number,
  // component: React.FC<{}>,
  loading: boolean,
  onMapMove: () => void
  //   magicNumber: number, // changes when we open / close bottom panel, so we can re-center map
] => {
  const bottomSheetRef = useRef<BottomSheet>(null);


  const loading = useSelector((state) => state.app.loading);

  // variables
  const snapPoints = useMemo(
    () =>
      loading ? ON_LOADING_SNAP : ["15%", "50%"],
    []
  );

  const snapIndex = loading ? 0 : 1;

  const loginPage = useSelector((state) => state.app.loginPage);

  useEffect(() => {
    if (loginPage) {
      bottomSheetRef.current?.close();
    } else {
      bottomSheetRef.current?.expand();
    }
  }, [loginPage]);

  const onMapMove = useCallback(() => {
    bottomSheetRef.current?.collapse();
  }, []);

  return [
    bottomSheetRef,
    snapPoints,
    snapIndex,
    !!loading,
    onMapMove,
  ];
};
