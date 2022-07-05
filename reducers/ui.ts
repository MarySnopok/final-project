import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  loading: boolean;
  error: false;
  loginPage: null | "login" | "singUp";
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
    showSingUp: (state) => {
      state.loginPage = "singUp";
    },
  },
});

export default ui;
