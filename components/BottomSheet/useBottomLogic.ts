import React, { useCallback, useEffect, useMemo, useRef } from "react";

import BottomSheet from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { selectResult } from "../../reducers/routes";
import { MainBottomLayout } from "./MainLayout";
import { SearchResultLayout } from "./SearchResult";

const ON_LOADING_SNAP = ["10%", "10%"];

export const useBottomLogic = (): [
  ref: React.RefObject<BottomSheet>,
  snapPoints: string[],
  snapIndex: number,
  component: React.FC<{}>,
  onMapMove: () => void,
//   magicNumber: number, // changes when we open / close bottom panel, so we can re-center map
] => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const searchResult = useSelector(selectResult);

  // variables
  const snapPoints = useMemo(
    () =>
      searchResult.status === "loading" ? ON_LOADING_SNAP : ["15%", "50%"],
    [searchResult]
  );

  const snapIndex = searchResult.status === "loading" ? 0 : 1;

  const loginPage = useSelector((state) => state.ui.loginPage);

  useEffect(() => {
    if (loginPage) {
      bottomSheetRef.current?.close();
    } else {
      bottomSheetRef.current?.expand();
    }
  }, [loginPage]);

  const component = searchResult.status === 'success' ? SearchResultLayout : MainBottomLayout;

  const onMapMove = useCallback(() => {
    bottomSheetRef.current?.collapse();
  }, []);


  return [bottomSheetRef, snapPoints, snapIndex, component, onMapMove];
};
