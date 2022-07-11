import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import {
  deleteFavorite,
  isRouteFavorite,
  saveFavorite,
} from "../reducers/user";
import { RouteId } from "../types/BE.types";
import { FavButton, FavButtonAfter } from "./FavButton";

export const FavoriteIcon = ({ routeId }: { routeId: RouteId }) => {
  const [loading, setLoading] = useState(false);
  const isFavorite = useSelector(isRouteFavorite(routeId));

  const dispatch = useDispatch();

  const addToFavorite = useCallback(async () => {
    setLoading(true);
    await dispatch(saveFavorite(routeId));
    setLoading(false);
  }, [routeId]);

  const removeFromFavorite = useCallback(async () => {
    setLoading(true);
    await dispatch(deleteFavorite(routeId));
    setLoading(false);
  }, [routeId]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return isFavorite ? (
    <FavButtonAfter onPress={removeFromFavorite} />
  ) : (
    <FavButton onPress={addToFavorite} />
  );
};
