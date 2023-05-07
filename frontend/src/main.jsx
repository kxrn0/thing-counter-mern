import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./context/AuthContext";
import { TagContextProvider } from "./context/TagContext";
import { CounterContextProvider } from "./context/CounterContext";
import App from "./App";
import "reset-css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CounterContextProvider>
      <TagContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </TagContextProvider>
    </CounterContextProvider>
  </React.StrictMode>
);
