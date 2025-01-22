import React, { useState, useContext } from "react";
import "./SignIn.css";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/App";
import { post } from "../../utilities";

const SignIn = () => {
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);

    post("/api/login", { token: userToken })
      .then(({ user, isNew }) => {
        console.log("User data:", user);
        if (isNew) {
          navigate("/signup", { state: { googleId: decodedCredential.sub } });
        } else {
          setUserId(user._id); // Update user context
          // Handle successful login
          navigate("/");
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
