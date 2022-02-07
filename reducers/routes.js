import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { API_URL } from "../utils/constants";

// First, creat the thunk
export const fetchRoutes = createAsyncThunk("routes/fetchRoutes", async ({ lat, long }) => {
  const response = await fetch(API_URL("tracks") + "?" + encodeURI(`lat=${lat}&long=${long}`));
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

    builder.addCase(fetchRoutes.fulfilled, (state, action) => {
      console.log("ACTIONS", action);
      const data = action.payload.response.data;
      state.status = "fulfilled";
      state.routes = data;
    });
  },
});

export default routes;

export const selectRoutesStatus = (state) => state.routes.status;
export const selectRoutes = (state) => state.routes.routes;
