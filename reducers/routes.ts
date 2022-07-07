import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API } from "../utils/api";
import { Point, RoutesResponse } from "../utils/BE.types";
import { pickRandomBackground } from "../utils/constants";

import { API_URL } from "../utils/constants";
import { FERoute, SearchResult } from "../utils/types";
import { GeoState, getUserGeoLocation } from "./geo";

export interface RoutesState {
  routes: FERoute[];
  error: any | undefined;
  status: "init" | "loading" | "success" | "no-access" | "error";
  result:
    | {
        ids: number[];
        radius: number;
        location: Point;
      }
    | "none";
}

export const getNearByRoutes = createAsyncThunk(
  "routes/getNearByRoutes",
  async (_, thunkApi) => {
    console.log("get near by routes 11");
    await thunkApi.dispatch(getUserGeoLocation());

    const loc = (thunkApi.getState() as { geo: GeoState }).geo.currentLocation;

    const resp = await thunkApi.dispatch(fetchRoutes({ ...loc! }));

    const data = resp.payload as RoutesResponse;
    thunkApi.dispatch(routes.actions.setResults(data));
  }
);

// First, creat the thunk
export const fetchRoutes = createAsyncThunk(
  "routes/fetchRoutes",
  async ({ lat, lon, radius }: Point & { radius?: number }) => {
    console.log("GET GEO LOCATION FOR", lat, lon);
    const response = await API.tracks(lat, lon, radius);

    // console.log("BE RESPONSE FOR ROUTES", response);

    return response;
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
  routes: [],
  error: undefined,
  status: "init",
  result: "none",
};

const routes = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<RoutesResponse>) => {
      const resp = action.payload;
      state.result = {
        ids: resp.routes.map((route) => route.id),
        radius: resp.radius,
        location: resp.location,
      };
    },
    clearResult: (state) => {
      state.result = 'none';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoutes.pending, (state) => {
      state.status = "loading";
    });
    // *** for individual route rendering
    builder.addCase(fetchOneRoute.pending, (state) => {
      state.status = "loading";
      state.routes = [];
    });
    builder.addCase(getNearByRoutes.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchRoutes.fulfilled, (state, action) => {
      // console.log("ACTIONS", action);
      const data = action.payload.routes.map((route) => {
        return {
          ...route,
          color: pickRandomBackground(),
        };
      });
      state.status = "success";
      state.routes = data;
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

export const selectResult = (state: {
  routes: RoutesState;
  geo: GeoState;
}): SearchResult => {
  if (state.routes.status !== "success") {
    const l = state.geo.currentLocation;
    return {
      status: state.routes.status,
      routes: [],
      location: l!,
    };
  }

  const result = state.routes.result;
  if (!result || result === "none") {
    // return "init";
    const l = state.geo.currentLocation;
    return {
      status: "init",
      routes: [],
      location: l!,
    };
  }

  const routes = state.routes.routes.filter((route) =>
    result.ids.includes(route.id)
  );

  return {
    status: "success",
    ...result,
    routes,
  };
};
