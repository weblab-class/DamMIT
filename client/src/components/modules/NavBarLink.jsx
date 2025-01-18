import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBarLink = ({ icon: Icon, name, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const activeStyle = { color: "var(--darkblue)" };

  return (
    <Link to={to} className="NavBar-link">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ...(isActive && activeStyle),
        }}
      >
        {Icon && (
          <Icon
            size={20}
            style={{ marginBottom: "4px", ...(isActive && activeStyle) }}
          />
        )}
        <span style={isActive ? activeStyle : {}}>{name}</span>
      </div>
    </Link>
  );
};

export default NavBarLink;
