import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import ThemeProvider from "./Theme";
import store from "./store/store";
import Notification from "./components/Notification/Notification";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
        <Notification />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
