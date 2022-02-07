import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../utils/constants";

// load profile
export const fetchProfile = createAsyncThunk("user/fetchProfile", async (_, thunkApi) => {
  const token = thunkApi.getState().user.accessToken;
  const response = await fetch(API_URL("profile"), {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  return response.json();
});

export const saveFavorite = createAsyncThunk("user/saveFavorite", async (route, thunkApi) => {
  const token = thunkApi.getState().user.accessToken;

  const response = await fetch(API_URL("favorite"), {
    method: "POST",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      route: {
        id: route.id,
        tags: route.tags,
      },
    }),
  });
  return response.json();
});

export const deleteFavorite = createAsyncThunk("user/deleteFavorite", async (routeId, thunkApi) => {
  const token = thunkApi.getState().user.accessToken;

  const response = await fetch(API_URL("favorite"), {
    method: "DELETE",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      route: {
        id: routeId,
      },
    }),
  });
  return response.json();
});

const user = createSlice({
  name: "user",
  initialState: {
    userId: null,
    username: null,
    accessToken: null,
    email: null,
    error: null,
    favorite: [],
  },
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload;
    },
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setEmail: (store, action) => {
      store.email = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setFavorite: (store, action) => {
      const favoriteRoute = store.favorite;
      favoriteRoute.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      const user = action.payload.response;
      state.favorite = user.favorite;
    });
    builder.addCase(saveFavorite.fulfilled, (state, action) => {
      const user = action.payload.response;
      state.favorite = user.favorite;
    });
    builder.addCase(deleteFavorite.fulfilled, (state, action) => {
      const user = action.payload.response;
      state.favorite = user.favorite;
    });
  },
});

export default user;

export const getFavoriteRoutes = (state) => state.user.favorite || [];
// it comes with id as a "string" in favorites, therefore we always convert to string
export const isRouteFavorite = (routeId) => (state) => getFavoriteRoutes(state).find((route) => route.id === routeId.toString());
