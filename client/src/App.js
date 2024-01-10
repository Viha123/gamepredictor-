import './App.css';
import { Route, Routes } from "react-router-dom";

import Navbar from './components/navbar';
import Fixtures from "./components/fixtures";
import Leaderboard from "./components/leaderboard";
import User from "./components/user"
import EditWinner from "./components/editWinner"
import Predictions from './components/predictions';

function App() {
  return (
    <div className="app-container bg-zinc-900">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Fixtures />} />
        <Route exact path="/fixtures" element={<Fixtures />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/user" element={<User />} />
        <Route path = "fixtures/:id/update/" element = {<EditWinner/>} />
        <Route path = "user/:id/predictions" element = {<Predictions />} />
      </Routes>
    </div>
  );
}

export default App;
