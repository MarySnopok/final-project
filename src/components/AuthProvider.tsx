import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import user, { fetchProfile } from "../reducers/user";

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem("accessToken").then(async (token) => {
      if (token) {
        dispatch(user.actions.setAccessToken(token));
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (accessToken) {
      console.log('try to load user')
      dispatch(fetchProfile());
    }
  }, [accessToken]);

  if (loading) {
    return null;
  }

  return children;
};
