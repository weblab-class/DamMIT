import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">DamMIT</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        <Link to="/newchallenge/" className="NavBar-link u-inlineBlock">
          New Challenge
        </Link>
        <Link to="/todo/" className="NavBar-link u-inlineBlock">
          To Do List
        </Link>
        <Link to="/leaderboard/" className="NavBar-link u-inlineBlock">
          Leaderboard
        </Link>
        {props.userId && (
          <Link
            to={`/profile/${props.userId}`}
            className="NavBar-link u-inlineBlock"
          >
            My Profile
          </Link>
        )}
        {props.userId ? (
          <button
            className="NavBar-link NavBar-login u-inlineBlock"
            onClick={props.handleLogout}
          >
            Sign out
          </button>
        ) : (
          <GoogleLogin
            text="signin_with"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
            containerProps={{
              className: "NavBar-link NavBar-login u-inlineBlock",
            }}
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
