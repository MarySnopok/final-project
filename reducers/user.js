import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { batch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, pickRandomBackground } from "../utils/constants";
import routes, { fetchRoutes } from "../reducers/routes";
import * as Location from "expo-location";
import ui from "./ui";

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

//save user profile picture

export const saveUserProfilePicture = createAsyncThunk("user/saveUserProfilePicture", async (userImage, thunkApi) => {
  const token = thunkApi.getState().user.accessToken;

  const response = await fetch(API_URL("profile"), {
    method: "POST",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profilePicture: userImage,
    }),
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
export const deleteFavorite = createAsyncThunk("user/deleteFavorite", async (route, thunkApi) => {
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
        id: route.id.toString(),
      },
    }),
  });
  const data = await response.json();
  return data;
});

export const signUpUser = createAsyncThunk("user/signup", async (body, thunkApi) => {
  // const token = thunkApi.getState().user.accessToken;
  const data = await fetch(API_URL("signup"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
  const response = data.response;
  console.log("response we go", response);

  if (data.success) {
    batch(() => {
      thunkApi.dispatch(user.actions.setUserId(response.userId));
      thunkApi.dispatch(user.actions.setUsername(response.username));
      thunkApi.dispatch(user.actions.setAccessToken(response.accessToken));
      thunkApi.dispatch(user.actions.setEmail(response.email));
      thunkApi.dispatch(user.actions.setError(null));
    });
  } else {
    batch(() => {
      thunkApi.dispatch(user.actions.setUserId(null));
      thunkApi.dispatch(user.actions.setUsername(null));
      thunkApi.dispatch(user.actions.setAccessToken(null));
      thunkApi.dispatch(user.actions.setEmail(null));
      thunkApi.dispatch(user.actions.setError(response));
    });
  }
});

export const signInUser = createAsyncThunk("user/signin", async (body, thunkApi) => {
  const data = await fetch(API_URL("signin"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
  const response = data.response;
  console.log("response we go", response);

  if (data.success) {
    batch(() => {
      thunkApi.dispatch(user.actions.setUserId(response.userId));
      thunkApi.dispatch(user.actions.setUsername(response.username));
      thunkApi.dispatch(user.actions.setAccessToken(response.accessToken));
      thunkApi.dispatch(user.actions.setError(null));
    });
  } else {
    batch(() => {
      thunkApi.dispatch(user.actions.setUserId(null));
      thunkApi.dispatch(user.actions.setUsername(null));
      thunkApi.dispatch(user.actions.setAccessToken(null));
      thunkApi.dispatch(user.actions.setError(response));
    });
  }
});

export const getUserGeoLocation = createAsyncThunk("user/getLocation", async (_, thunkApi) => {
  console.log("234234");
  try {
    thunkApi.dispatch(ui.actions.setLoading(true));
    console.log("324234");
    const data = await Location.requestForegroundPermissionsAsync();
    if (data.status !== "granted") {
      // permition was not granted - hiding loader
      thunkApi.dispatch(ui.actions.setLoading(false));
    } else {
      const locationData = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
      // user geodata
      console.log("locationdata", locationData);
      console.log("lat", locationData.coords.latitude);
      console.log("long", locationData.coords.longitude);
      thunkApi.dispatch(user.actions.setCoordinates({ lat: locationData.coords.latitude, long: locationData.coords.longitude }));

      await thunkApi.dispatch(
        fetchRoutes({
          lat: locationData.coords.latitude,
          long: locationData.coords.longitude,
        })
      );
      // hide loader when routes fetched
      thunkApi.dispatch(ui.actions.setLoading(false));
    }
  } catch (e) {
    console.log("err");
    console.error(e);
  }
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
  userImage: null,
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
      if (action.payload) {
        AsyncStorage.setItem("accessToken", action.payload);
      } else {
        AsyncStorage.removeItem("accessToken");
      }
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
      if (!action.payload.success) {
        return state;
      }
      const user = action.payload.response;
      state.favorite = user.favorite.map((route) => {
        route.color = pickRandomBackground();
        return route;
      });
      state.username = user.username;
      state.email = user.email;
      state.userImage = user.profilePicture;
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
    builder.addCase(saveUserProfilePicture.pending, (state, action) => {
      console.log("action>>", action);
      state.userImage = action.meta.arg;
    });
  },
});

export default user;

export const { setUserImage } = user.actions;

export const getFavoriteRoutes = (state) => state.user.favorite || [];
// it comes with id as a "string" in favorites, therefore it is always converted to string
export const isRouteFavorite = (routeId) => (state) => getFavoriteRoutes(state).find((route) => route.id === routeId.toString());
