import {
  createSlice,
  createAsyncThunk,
  Action,
  PayloadAction,
} from "@reduxjs/toolkit";
import { batch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, pickRandomBackground } from "../utils/constants";
import routes, { fetchRoutes } from "./routes";
import * as Location from "expo-location";
import ui from "./ui";
import { RouteId, User } from "../types/BE.types";
import { RootState, UserState } from "../types/app.types";
import { API } from "../utils/api";
import { normalize } from "../utils/normalize";
import { FERoute } from "../types/types";
import routesSlice from "./routes";

// load profile
export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, thunkApi) => {
    const token = (thunkApi.getState() as any).user.accessToken;
    const response = await fetch(API_URL("profile"), {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    return response.json();
  }
);

export const fetchFavorite = createAsyncThunk(
  "user/fetchFavorite",
  async (_, thunkApi) => {
    const token = (thunkApi.getState() as any).user.accessToken;
    const routes = await API.user.getFavorite(token);
    console.log("routes", routes);

    const { result, data } = normalize(
      routes,
      (item) =>
        ({
          ...item,
          color: pickRandomBackground(),
        } as FERoute)
    );

    // console.log("BE RESPONSE FOR ROUTES", response);
    thunkApi.dispatch(routesSlice.actions.storeRoutes(data));

    return result;
  }
);

//save user profile picture

export const saveUserProfilePicture = createAsyncThunk(
  "user/saveUserProfilePicture",
  async (userImage, thunkApi) => {
    const token = (thunkApi.getState() as any).user.accessToken;

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
  }
);

// save fav route
export const saveFavorite = createAsyncThunk<User, RouteId>(
  "user/saveFavorite",
  async (id, thunkApi) => {
    const token = (thunkApi.getState() as any).user.accessToken;

    const response = await fetch(API_URL("favorite"), {
      method: "POST",
      headers: {
        Authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        routeId: id,
      }),
    });
    return response.json();
  }
);

// delete fav route
export const deleteFavorite = createAsyncThunk<User, RouteId>(
  "user/deleteFavorite",
  async (route, thunkApi) => {
    const token = (thunkApi.getState() as any).user.accessToken;

    const response = await fetch(API_URL("favorite"), {
      method: "DELETE",
      headers: {
        Authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: route,
      }),
    });
    const data = await response.json();
    return data;
  }
);

export const signUpUser = createAsyncThunk(
  "user/signup",
  async (body, thunkApi) => {
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
  }
);

export const signInUser = createAsyncThunk<
  void,
  {
    username: string;
    password: string;
  }
>("user/signin", async (body, thunkApi) => {
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

const userInitialState: UserState = {
  // userId: ,
  // username: null,
  // accessToken: null,
  // email: null,
  // error: null,
  favorite: [],
  coordinates: {
    lat: 59.544,
    long: 10.444,
  },
  // userImage: null,
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
    setupUserStore: (
      store,
      action: PayloadAction<{
        error?: Error;
        userId?: string;
        username?: string;
        userToken?: string;
      }>
    ) => {
      return { ...store, ...action.payload };
    },
    logout: () => {
      // remove auth token from storage
      AsyncStorage.removeItem("accessToken");
      // reset to initial state
      return userInitialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavorite.fulfilled, (state, routesAction) => {
      state.favorite = routesAction.payload;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      if (!action.payload.success) {
        return state;
      }
      const user = action.payload.response;
      // state.favorite = user.favorite;
      state.username = user.username;
      state.email = user.email;
      state.userImage = user.profilePicture;
    });
    builder.addCase(saveFavorite.fulfilled, (state, action) => {
      const user = action.payload.response;
      state.favorite = user.favorite.map((route) => route.id);
    });
    builder.addCase(deleteFavorite.fulfilled, (state, action) => {
      const user = action.payload.response;
      state.favorite = user.favorite.map((route) => route.id);
    });
    builder.addCase(saveUserProfilePicture.pending, (state, action) => {
      console.log("action>>", action);
      state.userImage = action.meta.arg;
    });
  },
});

export default user;

export const getFavoriteRoutes = (state) => state.user.favorite || [];
// it comes with id as a "string" in favorites, therefore it is always converted to string
export const isRouteFavorite = (routeId) => (state) =>
  getFavoriteRoutes(state).find((route) => route.id === routeId.toString());

export const isUserLoggedIn = (state: { user: UserState }) =>
  !!state.user.accessToken;
export const getUserAvatar = (state: { user: UserState }) =>
  state.user.userImage;
