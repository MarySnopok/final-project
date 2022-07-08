// import { createSlice } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  AppMainState,
  PossibleScreens,
  RootState,
  RouteScreen,
  SearchResultScreen,
} from "../types/app.types";
import { RouteId, RoutesResponse } from "../types/BE.types";
import { getUserGeoLocation } from "./geo";
import routes, { fetchRoutes } from "./routes";

export const searchNearByRoutes = createAsyncThunk(
  "app/searchNearByRoutes",
  async (_, thunkApi) => {
    try {
      console.log("get near by routes 11");
      thunkApi.dispatch(appState.actions.setLoading(true));
      await thunkApi.dispatch(getUserGeoLocation());

      const loc = (thunkApi.getState() as RootState).geo.currentLocation;

      console.log("RELOAD ROUTES!");
      const resp = await thunkApi.dispatch(fetchRoutes({ ...loc! }));

      const data = resp.payload as RouteId[];
      // thunkApi.dispatch(routes.actions.setResults(data));
      console.log("FOO!");
      thunkApi.dispatch(appState.actions.pushSearchResultScreen(data));
      console.log("Hello! We did load nad processed routes, etc");
      thunkApi.dispatch(appState.actions.setLoading(false));
    } catch (e) {
      console.error(e);
      console.log("ERROR!");
    }
  }
);

export const openRouteScreen = createAsyncThunk<void, RouteId>(
  "app/openRoute",
  async (id, thunkApi) => {
    try {
      const route = (thunkApi.getState() as RootState).routes.routes[id];
      if (!route) {
        thunkApi.dispatch(appState.actions.setLoading(true));
        console.log("NO ROUTE FOUND, LOADING ROUTE");
        thunkApi.dispatch(appState.actions.setLoading(false));
      }

      thunkApi.dispatch(appState.actions.pushRouteScreen(id));
      console.log("Hello! We did load nad processed routes, etc");
    } catch (e) {
      console.error(e);
      console.log("ERROR!");
    }
  }
);

const initialState: AppMainState = {
  screenStack: [
    {
      type: PossibleScreens.homeScreen, // always start with home screen
    },
  ],
  loginPage: null,
};

export const appState = createSlice({
  name: "app",
  initialState,
  reducers: {
    pushSearchResultScreen: (state, action: PayloadAction<RouteId[]>) => {
      const resultScreen: SearchResultScreen = {
        type: PossibleScreens.searchResultScreen,
        results: action.payload,
      };
      state.screenStack.push(resultScreen);
    },
    pushRouteScreen: (state, action: PayloadAction<RouteId>) => {
      const routeScreen: RouteScreen = {
        type: PossibleScreens.routeScreen,
        route: action.payload,
      };

      state.screenStack.push(routeScreen);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    popScreen: (state) => {
      state.screenStack.pop();
    },
  },
});

export const getCurrentScreen = (state: RootState) =>
  state.app.screenStack[state.app.screenStack.length - 1];
