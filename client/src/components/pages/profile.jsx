// App.jsx
import React, { useState } from "react";
import "./Profile.css";
import ProfileCard from "../modules/profileCard";
import "/Users/adembizid/work/skeleton/PauloHS-Silva-bizid777-volianyko/client/Adem.jpg";

const Profile = () => {
  const user = {
    username: "_Adem.Bizid_",
    major: "computer science",
    dorm: "Next house",
    classyear: "28'",
    posts: 3,
    completionRate: 24,
    difficultyPoints: 1345,
    percentRank: "2nd",
    pointsRank: "3rd",
    challenge: {
      title: "Visit All Frats",
      description:
        "Yeah, I know we’ve all been too locked in the past few weeks. Let’s just chill for a bit and have some fun going to parties at ALL MIT frats!",
      currentDifficulty: 2.43,
      completed: 234,
      likes: 617,
      imageUrl: "Adem.jpg", // Placeholder image for profile picture
    },
  };

  return (
    <div className="overall">
      <ProfileCard {...user} />
    </div>
  );
};

export default Profile;
