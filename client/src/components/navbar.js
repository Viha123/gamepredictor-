import React from "react";

import NavbarElement from "./NavbarElement";
export default function Navbar() {
    return (
        <div className="fixed top-0 w-full z-50 pt-10 pb-10 bg-zinc-900">
            <ul className = "flex flex-row place-content-center">
                {/* <NavLink to="/fixtures" className="font-mono cursor-pointer ml-10 mr-10 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">Fixture Lists</NavLink>
                <NavLink to="/leaderboard" className="font-mono cursor-pointer ml-10 mr-10 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">Leaderboard</NavLink>
                <NavLink to="/user" className="font-mono cursor-pointer ml-10 mr-10 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">Sign In</NavLink> */}
                <NavbarElement link="/fixtures" name="Fixtures"/>
                <NavbarElement link="/leaderboard" name = "Leaderboard"/>
                <NavbarElement link="/user" name = "Sign In"/>
            </ul>
            
        </div>
    )
}