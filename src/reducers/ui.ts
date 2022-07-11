import { createSlice } from "@reduxjs/toolkit";
import { SearchResult } from "../types/types";

interface UIState {
  loading: boolean;
  error: false;
  loginPage: null | "login" | "singUp" | "profile";
  routeState?: 'search-result';
}

const initialState: UIState = {
  loading: false,
  error: false,
  loginPage: null,
};

export const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    showLogin: (state) => {
      state.loginPage = "login";
    },
    hideLogin: (state) => {
      state.loginPage = null;
    },

    showProfile: (state) => {
      state.loginPage = "profile";
    },
  },
});

export default ui;
