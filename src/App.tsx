import React from "react";
import "./App.css";
import { ConnectWallet } from "./components/ConnectWallet";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        We swear we are not Synthetix
        <ConnectWallet />
      </header>
    </div>
  );
}

export default App;
