import React from "react";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/Profile";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>We swear, we aren't synthetix</h1>
        <ConnectWallet />
      </header>

      <Routes>
        <Route path="/" key="landing-page" element={<LandingPage />} />
        <Route path="/profile" key="profile-page" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
