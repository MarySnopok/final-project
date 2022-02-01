import React from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { Consent } from "./components/Consent";
import { LogIn } from "./components/LogIn";
import { Profile } from "./components/Profile";
import { History } from "./components/History";
import { SignUp } from "./components/SignUp";
import { EntryPage } from "./components/EntryPage";
import { NotFound } from "./components/NotFound";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import user from "./reducers/user";
import routes from "./reducers/routes";

const reducer = combineReducers({
  user: user.reducer,
  routes: routes.reducer,
});

const store = configureStore({ reducer });

export default function App() {
  return (
    <>
      <Provider store={store}>
        {/* <BrowserRouter> */}
        <HashRouter>
          <Routes>
            <Route path="/" element={<Consent />} />
            <Route path="/entrypage" element={<EntryPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<LogIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* </BrowserRouter> */}
        </HashRouter>
      </Provider>
    </>
  );
}
