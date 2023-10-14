import React from "react";

import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbar">
            <button><NavLink to = "/fixtures">Fixture Lists</NavLink></button>
            <button><NavLink to = "/leaderboard">Leaderboard</NavLink></button>
            <button><NavLink to="/user">Your Predictions</NavLink></button>
        </div>
    )
}