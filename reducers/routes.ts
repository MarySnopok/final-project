import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pickRandomBackground } from "../utils/constants";

import { API_URL } from "../utils/constants";

// First, creat the thunk
export const fetchRoutes = createAsyncThunk("routes/fetchRoutes", async ({ lat, long }) => {
  const response = await fetch(API_URL("tracks2") + "?" + encodeURI(`lat=${lat}&long=${long}`));
  return response.json();
});

// *** for individual route rendering
export const fetchOneRoute = createAsyncThunk("routes/fetchOneRoute", async (id) => {
  const response = await fetch(API_URL("tracks") + "/" + id);
  return response.json();
});

const routes = createSlice({
  name: "routes",
  initialState: {
    routes: [],
    error: null,
    status: "init",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoutes.pending, (state) => {
      state.status = "loading";
    });
    // *** for individual route rendering
    builder.addCase(fetchOneRoute.pending, (state) => {
      state.status = "loading";
      state.routes = [];
    });

    builder.addCase(fetchRoutes.fulfilled, (state, action) => {
      console.log("ACTIONS", action);
      const data = action.payload.response.map((route) => {
        route.color = pickRandomBackground();
        return route;
      });
      state.status = "fulfilled";
      state.routes = data;
    });
    builder.addCase(fetchOneRoute.fulfilled, (state, action) => {
      console.log("ACTIONS", action);
      const data = action.payload.response.data.map((route) => {
        route.color = pickRandomBackground();
        return route;
      });
      state.status = "fulfilled";
      state.routes = data;
    });
  },
});
export default routes;

export const selectRoutesStatus = (state) => state.routes.status;
export const selectRoutes = (state) => state.routes.routes;
