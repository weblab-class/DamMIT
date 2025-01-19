import React, { useState } from "react";
import "../pages/Profile.css";
const ProfileCard = ({
  username,
  posts,
  completionRate,
  difficultyPoints,
  percentRank,
  pointsRank,
  challenge,
  major,
  dorm,
  classyear,
}) => {
  const [likes, setLikes] = useState(challenge.likes);
  const [difficulty, setDifficulty] = useState(challenge.currentDifficulty);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <div className="profile-card">
      <header className="header">
        <h1 className="logo">DamMIT</h1>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">New Challenge</a>
          <a href="#">To Do List</a>
          <a href="#">Leaderboard</a>
          <a href="#">My Profile</a>
        </nav>
      </header>

      <div className="profile-section u-flex">
        <div className="pic">
          <img src={challenge.imageUrl} alt="User" className="profile-pic subContainer" />
          <h2>@{username}</h2>
          <button className="edit-profile">Edit Profile</button>
        </div>
        <div>
          <div className="personal_info subContainer u-flex ">
            <h4 className="subContainer">🎓{major}</h4>
            <h4 className="subContainer">🏢{dorm}</h4>
            <h4 className="subContainer">📆{classyear}</h4>
          </div>
          <div className="profile-stats u-flex subContainer">
            <p className="subContainer">{posts} Posts </p>
            <p className="subContainer">✅{completionRate}% Completed </p>
            <p className="subContainer">💪{difficultyPoints} Difficulty Pts</p>
          </div>
          <div className="rankings u-flex subContainer">
            <p className="subContainer">% Ranking: {percentRank}</p>
            <p className="subContainer">Pts Ranking: {pointsRank}</p>
          </div>
        </div>
      </div>

      <div className="challenge-card">
        <h3>{challenge.title}</h3>
        <p>{challenge.description}</p>

        <div className="challenge-actions">
          <button onClick={handleLike} className="like-btn subContainer">
            ❤️ {likes} Likes
          </button>
          <p className="subContainer">✅{challenge.completed} Completed</p>
          <p className="subContainer">💪Current Difficulty: {difficulty} </p>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
