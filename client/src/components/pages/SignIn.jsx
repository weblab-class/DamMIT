import React, { useState, useContext } from "react";
import "./SignIn.css";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../components/App';

const SignIn = () => {
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: userToken }),
    })
      .then((res) => res.json())
      .then(({ user, isNew }) => {
        console.log("User data:", user);
        if (isNew) {
          navigate("/signup", { state: { googleId: decodedCredential.sub } });
        } else {
          setUserId(user._id); // Update user context
          // Handle successful login
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  const handleGoogleLoginFailure = (response) => {
    console.error("Google login failed:", response);
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <GoogleLogin
        clientId="868412125046-d7vkgkl4dml38m39rqjemrnjbb49dojm.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default SignIn;
