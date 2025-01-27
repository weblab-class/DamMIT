import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/App";
import "./SignUp.css";

const SignUp = () => {
  const location = useLocation();
  const googleId = location.state?.googleId || "";
  const navigate = useNavigate();

  const [classYear, setClassYear] = useState("");
  const [username, setUsername] = useState("");
  const [major, setMajor] = useState("");
  const [dorm, setDorm] = useState("");

  const { setUserId } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send sign-up data to the server
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        googleId,
        classYear,
        username,
        major,
        dorm,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User created:", data);
        setUserId(data._id); // Update user context
        navigate(`/profile/${data._id}`); // Redirect to profile page
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="classYear">Class Year:</label>
          <input
            type="text"
            id="classYear"
            value={classYear}
            onChange={(e) => setClassYear(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="major">Major:</label>
          <input
            type="text"
            id="major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dorm">Dorm:</label>
          <input
            type="text"
            id="dorm"
            value={dorm}
            onChange={(e) => setDorm(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default SignUp;
