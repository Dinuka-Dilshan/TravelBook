import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import ThemeProvider from "./Theme";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
