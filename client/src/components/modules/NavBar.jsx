import React from "react";
import { Link } from "react-router-dom";
import NavBarLink from "./NavBarLink";
import { FaHome, FaPlusCircle, FaList, FaTrophy } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar">
      <div className="NavBar-title">DamMIT</div>
      <ul className="NavBar-list">
        <NavBarLink icon={FaHome} name="Home" to="/" />
        <NavBarLink
          icon={FaPlusCircle}
          name="New Challenge"
          to="/newchallenge/"
        />
        <NavBarLink icon={FaList} name="To Do List" to="/todo/" />
        <NavBarLink icon={FaTrophy} name="Leaderboard" to="/leaderboard/" />
        {props.userId ? (
          <NavBarLink
            icon={MdAccountCircle}
            name="My Profile"
            to={`/profile/${props.userId}`}
          />
        ) : (
          <NavBarLink
            icon={MdAccountCircle}
            name="Sign In"
            to="/signin"
          />
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
