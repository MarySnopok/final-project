import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Consent } from "./components/Consent";
import { LogIn } from "./components/LogIn";
import { SignUp } from "./components/SignUp";
import { EntryPage } from "./components/EntryPage";
import { NotFound } from "./components/NotFound";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import user from "./reducers/user";

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export default function App() {
  const [text, onChangeText] = useState("Useless Text");
  const handleChange = (event) => {
    const { name, type, text } = event;
    let processedData = text;
    if (type === "text") {
      processedData = text;
    } else if (type === "number") {
      processedData = text;
    }
    onChangeText(processedData);
  };
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Consent />} />
            <Route path="/entrypage" element={<EntryPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<LogIn />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}
