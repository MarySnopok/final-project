import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API } from "../utils/api";
import {
  Point,
  ProcessedRoute,
  RouteId,
  RoutesResponse,
} from "../types/BE.types";
import { pickRandomBackground } from "../utils/constants";

import { API_URL } from "../utils/constants";
import { FERoute, SearchResult } from "../types/types";
import { RootState, RoutesState, UserState } from "../types/app.types";
import { normalize } from "../utils/normalize";

// export const getNearByRoutes = createAsyncThunk(
//   "routes/getNearByRoutes",
//   async (_, thunkApi) => {
//     console.log("get near by routes 11");
//     await thunkApi.dispatch(getUserGeoLocation());

//     const loc = (thunkApi.getState() as { geo: GeoState }).geo.currentLocation;

//     const resp = await thunkApi.dispatch(fetchRoutes({ ...loc! }));

//     const data = resp.payload as RoutesResponse;
//     // thunkApi.dispatch(routes.actions.setResults(data));
//   }
// );

// First, creat the thunk
export const fetchRoutes = createAsyncThunk(
  "routes/fetchRoutes",
  async ({ lat, lon, radius }: Point & { radius?: number }, thunkApi) => {
    console.log("GET GEO LOCATION FOR", lat, lon);
    const response = await API.tracks(lat, lon, radius);
    const { result, data } = normalize(
      response.routes,
      (item) =>
        ({
          ...item,
          color: pickRandomBackground(),
        } as FERoute)
    );

    // console.log("BE RESPONSE FOR ROUTES", response);
    thunkApi.dispatch(routes.actions.storeRoutes(data));

    return result;
  }
);

// *** for individual route rendering
export const fetchOneRoute = createAsyncThunk(
  "routes/fetchOneRoute",
  async (id) => {
    const response = await fetch(API_URL("tracks") + "/" + id);
    return response.json();
  }
);

const initialState: RoutesState = {
  routes: {},
  error: undefined,
  status: "init",
  // result: "none",
};

const routes = createSlice({
  name: "routes",
  initialState,
  reducers: {
    storeRoutes: (state, action: PayloadAction<Record<RouteId, FERoute>>) => {
      state.routes = {
        ...state.routes,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoutes.pending, (state) => {
      state.status = "loading";
    });
    // *** for individual route rendering
    builder.addCase(fetchOneRoute.pending, (state) => {
      state.status = "loading";
      // state.routes = {};
    });
    builder.addCase(fetchRoutes.fulfilled, (state, action) => {
      // console.log("ACTIONS", action);
      // const data = action.payload.routes.map((route) => {
      //   return {
      //     ...route,
      //     color: pickRandomBackground(),
      //   };
      // });
      // state.status = "success";
      // state.routes = data.reduce();
    });
    builder.addCase(fetchOneRoute.fulfilled, (state, action) => {
      console.log("ACTIONS", action);
      const data = action.payload.response.data.map((route) => {
        route.color = pickRandomBackground();
        return route;
      });
      state.status = "success";
      state.routes = data;
    });
  },
});
export default routes;

export const selectRoutesStatus = (state) => state.routes.status;
export const selectRoutes = (state) => state.routes.routes;

export const getRouteById = (id: RouteId) => (state: RootState) =>
  state.routes.routes[id];

export const getAnyRouteById =
  (id: RouteId) =>
  (state: RootState): FERoute =>
    state.routes.routes[id];

export const isRouteFavorite =
  (id: RouteId) => (state: { user: UserState }) => {
    return state.user.favorite.some((route) => route === id);
    // return false;
  };
