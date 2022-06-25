import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ConnectWalletProvider } from "./context/useConnectWalletContext";

ReactDOM.render(
  <BrowserRouter>
    <ConnectWalletProvider>
      <App />
    </ConnectWalletProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
