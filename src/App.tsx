import './App.css';
import ConnectWallet from './components/ConnectWallet';
import { Link, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProfilePage from './components/Profile';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Pozitions</h1>
        <Link to="/">Home</Link>
        <Link to="gallery">Gallery</Link>
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
