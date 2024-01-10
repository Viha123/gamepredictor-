import React from "react";
import { NavLink } from "react-router-dom";

export default function NavbarElement(props) {
  return (
    <NavLink to = {props.link} className="no-underline text-green-300 font-mono cursor-pointer ml-10 mr-10 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
      {props.name}
    </NavLink>

  );
}