import React, { useState } from "react";
import "../pages/Profile.css";
const ProfileCard = ({
  username,
  completionRate,
  difficultyPoints,
  percentRank,
  pointsRank,
  major,
  dorm,
  classyear,
}) => {
  const im = "/default-profile.png"

  return (
    <div className="profile-card">
      <div className="profile-section u-flex">
        <div className="pic">
          <img src={im} alt="User" className="profile-pic subContainer" />
          <h2>@{username}</h2>
          <button className="edit-profile">Edit Profile</button>
        </div>
        <div>
          <div className="personal_info subContainer u-flex ">
            <h3 className="subContainer">🎓{major}</h3>
            <h3 className="subContainer">🏢{dorm}</h3>
            <h3 className="subContainer">📆{classyear}</h3>
          </div>
          <div className="profile-stats u-flex subContainer">
            <p className="subContainer">✅{completionRate}% Completed </p>
            <p className="subContainer">💪{difficultyPoints} Difficulty Pts</p>
          </div>
          <div className="rankings u-flex subContainer">
            <p className="subContainer">% Ranking: {percentRank}</p>
            <p className="subContainer">Pts Ranking: {pointsRank}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
