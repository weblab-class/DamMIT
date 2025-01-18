import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
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
        {props.userId && (
          <NavBarLink
            icon={MdAccountCircle}
            name="My Profile"
            to={`/profile/${props.userId}`}
          />
        )}
        {props.userId ? (
          <button
            className="NavBar-link NavBar-login"
            onClick={props.handleLogout}
          >
            Sign out
          </button>
        ) : (
          <GoogleLogin
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
            containerProps={{
              className: "NavBar-link NavBar-login",
            }}
          />
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
