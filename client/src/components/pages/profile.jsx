// App.jsx
import React, { useState, useEffect } from "react";
import "./Profile.css";
import ProfileCard from "../modules/ProfileCard.jsx";
import Card from "../modules/Card.jsx";
import { useOutletContext } from "react-router-dom";
import { get } from "../../utilities.js";
import "./ToDoList.css";

// import "/Users/adembizid/work/skeleton/PauloHS-Silva-bizid777-volianyko/client/Adem.jpg";

const Profile = () => {
  const user = {
    username: "_Adem.Bizid_",
    major: "computer science",
    dorm: "Next house",
    classyear: "28'",
    completionRate: 24,
    difficultyPoints: 1345,
    percentRank: "2nd",
    pointsRank: "3rd",
    //missing an image
    // posts he liked
  };
  const props = useOutletContext();
  const [likedChallenges, setlikedChallenges] = useState([]);

  useEffect(() => {
    const fetchLikedChallenges = async () => {
      const todoIds = await get(`/api/user/${props.userId}/todos`);
      const challengeObjs = await get("/api/challenges");
      const userLikes = await get(`/api/user/${props.userId}/likes`);
      const userCompleted = await get(`/api/user/${props.userId}/completed`);
      const filteredChallenges = challengeObjs
        .map((challenge) => ({
          ...challenge,
          likedByUser: userLikes.includes(challenge._id),
          addedToTodo: todoIds.includes(challenge._id),
          completed: userCompleted.includes(challenge._id),
        }))
        .filter((challenge) => userLikes.includes(challenge._id));
      setlikedChallenges(filteredChallenges);
    };
    fetchLikedChallenges();
  }, [props.userId]);

  const filteredChallenges = likedChallenges.filter((challenge) => {
    return challenge.likedByUser; // all challenges
  });

  return (
    <div className="overall">
      <ProfileCard {...user} />
      <div className="ChallengeList">
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((challenge) => (
            <Card
              key={challenge._id}
              _id={challenge._id}
              creator_name={challenge.creator_name}
              creator_id={challenge.creator_id}
              title={challenge.title}
              content={challenge.content}
              likes={challenge.likes}
              difficulty={challenge.difficulty}
              likedByUser={challenge.likedByUser}
              addedToTodo={challenge.addedToTodo}
              completedByUser={challenge.completed}
              num_completed={challenge.num_completed}
              completed={challenge.completed}
              userId={props.userId}
            />
          ))
        ) : (
          <p>No liked challenges!</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
