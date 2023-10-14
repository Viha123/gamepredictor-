import './App.css';
import { Route, Routes } from "react-router-dom";

import Navbar from './components/navbar';
import Fixtures from "./components/fixtures";
import Leaderboard from "./components/leaderboard";
import User from "./components/user"
function App() {
  return (
    <div className="app-container">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Fixtures />} />
        <Route exact path="/fixtures" element={<Fixtures />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
