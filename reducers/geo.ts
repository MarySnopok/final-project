import * as Location from "expo-location";
import {
  createSlice,
  createAsyncThunk,
  Action,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Point } from "../utils/BE.types";

export interface GeoState {
  currentLocation?: Point;
  status: "init" | "loading" | "success" | "no-access"; // | 'manual'; manual for picking city manually
}

const initialState: GeoState = {
  status: "init",
};

export const getUserGeoLocation = createAsyncThunk<Point, void>('geo/getUserGeoLocation', async (): Promise<Point> => {
  try {
    console.log("324234");
    const data = await Location.requestForegroundPermissionsAsync();
    if (data.status !== "granted") {
      // permition was not granted - hiding loader
      console.log("no permissions");
      throw new Error('no access');
    } else {
      const locationData = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      });
      return {
        lat: locationData.coords.latitude,
        lon: locationData.coords.longitude,
      };
      // user geodata
      console.log("locationdata", locationData);
      console.log("lat", locationData.coords.latitude);
      console.log("long", locationData.coords.longitude);
      //   thunkApi.dispatch(
      //     user.actions.setCoordinates({
      //       lat: locationData.coords.latitude,
      //       long: locationData.coords.longitude,
      //     })
      //   );

      //   await thunkApi.dispatch(
      //     fetchRoutes({
      //       lat: locationData.coords.latitude,
      //       long: locationData.coords.longitude,
      //     })
      //   );
      // hide loader when routes fetched
      //   thunkApi.dispatch(ui.actions.setLoading(false));
    }
  } catch (e) {
    console.log("err");
    console.error(e);
    throw e;
  }
});

export const geoState = createSlice({
  name: "geo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserGeoLocation.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getUserGeoLocation.fulfilled, (state, action) => {
      state.status = "success";
      state.currentLocation = action.payload;
    });

    builder.addCase(getUserGeoLocation.rejected, (state) => {
      state.status = "no-access";
    });
  },
});
