import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { API_URL } from "../utils/constants";

// First, create the thunk
export const fetchRoutes = createAsyncThunk("routes/fetchRoutes", async ({ lat, long }) => {
  const response = await fetch(`${API_URL("tracks")}?lat=${lat}&long=${long}`);
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
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchRoutes.fulfilled, (state, action) => {
      // Add user to the state array
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
