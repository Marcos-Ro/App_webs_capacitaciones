import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { inicializarSistema } from "./services/storageService";

inicializarSistema();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);