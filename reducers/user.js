import { createSlice } from "@reduxjs/toolkit";

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
});

export default user;
