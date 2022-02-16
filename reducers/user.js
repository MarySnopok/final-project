import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, pickRandomBackground } from "../utils/constants";

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

// save fav route
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

// delete fav route
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

const userInitialState = {
  userId: null,
  username: null,
  accessToken: null,
  email: null,
  error: null,
  favorite: [],
  coordinates: {
    lat: 59.544,
    long: 10.444,
  },
};

const user = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload;
    },
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
      console.log("setting access token", action.payload);
      AsyncStorage.setItem("accessToken", action.payload);
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
    setCoordinates: (store, action) => {
      const coordinatesObject = store.coordinates;
      coordinatesObject.lat = action.payload.lat;
      coordinatesObject.long = action.payload.long;
    },
    logout: () => {
      // remove auth token from storage
      AsyncStorage.removeItem("accessToken");
      // reset to initial state
      return userInitialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      const user = action.payload.response;
      state.favorite = user.favorite.map((route) => {
        route.color = pickRandomBackground();
        return route;
      });
      state.username = user.username;
      state.email = user.email;
    });
    builder.addCase(saveFavorite.fulfilled, (state, action) => {
      const user = action.payload.response;
      state.favorite = user.favorite.map((route) => {
        route.color = pickRandomBackground();
        return route;
      });
    });
    builder.addCase(deleteFavorite.fulfilled, (state, action) => {
      const user = action.payload.response;
      state.favorite = user.favorite.map((route) => {
        route.color = pickRandomBackground();
        return route;
      });
    });
  },
});

export default user;

export const getFavoriteRoutes = (state) => state.user.favorite || [];
// it comes with id as a "string" in favorites, therefore it is always converted to string
export const isRouteFavorite = (routeId) => (state) => getFavoriteRoutes(state).find((route) => route.id === routeId.toString());
