import React from "react";
//import { Routes, Route, HashRouter } from "react-router-dom";
// import { Route, Router, Routes, Link } from "react-router";
import { Router, Routes, Route } from "./ui_fractions/router/react-router";
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
import ui from "./reducers/ui";

const reducer = combineReducers({
  user: user.reducer,
  routes: routes.reducer,
  ui: ui.reducer,
});

const store = configureStore({ reducer });

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Consent />} />
            <Route path="/entrypage" element={<EntryPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<LogIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

// const errorStatus = useSelector((store) => store.ui.error);

// if (errorStatus === true) {
//   return <Opps />;
// }
