import React from "react";
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
import { AuthProvider } from "./components/AuthProvider";
import { LogOut } from "./components/Logout";
import user from "./reducers/user";
import routes from "./reducers/routes";
import ui from "./reducers/ui";
import { Main } from "./components/Main";
import { geoState } from "./reducers/geo";
import { appState } from "./reducers/app";

const reducer = combineReducers({
  user: user.reducer,
  routes: routes.reducer,
  ui: ui.reducer,
  geo: geoState.reducer,
  app: appState.reducer,
});



const store = configureStore({ reducer });


export function App() {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <Main />
          {/* <Router>
            <Routes>
              <Route exact path="/" element={<Consent />} />
              <Route path="/entrypage" element={<EntryPage />} />
              <Route path="/entrypage/:id" element={<EntryPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<LogIn />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/history" element={<History />} />
              <Route path="/logout" element={<LogOut />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router> */}
        </AuthProvider>
      </Provider>
    </>
  );
}
