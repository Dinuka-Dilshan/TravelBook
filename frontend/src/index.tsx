import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import Notification from "./components/Notification";
import "./index.css";
import store from "./store/store";
import ThemeProvider from "./Theme";

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
