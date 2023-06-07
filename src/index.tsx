import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <div className="app">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </div>
);
