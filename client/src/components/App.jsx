import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./modules/NavBar";

import jwt_decode from "jwt-decode";

import "../utilities.css";

import { socket } from "../client-socket";

import { get, post } from "../utilities";

export const UserContext = createContext(null);

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user && user._id) {
        // they are registered in the database, and currently logged in.
        setUserId(user._id);
      } else {
        setUserId(undefined); // Ensure userId is undefined if not logged in
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined); // Clear userId on logout
    post("/api/logout");
  };

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <NavBar
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userId={userId}
      />
      <div className="App-container">
        <Outlet context={{ userId: userId }} />
      </div>
    </UserContext.Provider>
  );
};

export default App;
