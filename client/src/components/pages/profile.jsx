// App.jsx
import React, { useState, useEffect } from "react";
import "./Profile.css";
import ProfileCard from "../modules/profileCard.jsx";
import Card from "../modules/Card.jsx";
import { useParams, useOutletContext } from "react-router-dom";
import { get, post } from "../../utilities.js";
import "./ToDoList.css";

const Profile = () => {
  const { userId } = useParams();
  const props = useOutletContext();
  const [likedChallenges, setlikedChallenges] = useState([]);
  const [createdChallenges, setCreatedChallenges] = useState([]);
  const [userData, setUserData] = useState(null);
  const [showLikedChallenges, setShowLikedChallenges] = useState(true);
  const [allChallenges, setAllChallenges] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [profileImage, setProfileImage] = useState("/default-profile.png");

  useEffect(() => {
    console.log("UserID for API request:", userId); // Log the userId
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
    const fetchLikedChallenges = async () => {
      const todoIds = await get(`/api/user/${userId}/todos`);
      const challengeObjs = await get("/api/challenges");
      const userLikes = await get(`/api/user/${userId}/likes`);
      const userCompleted = await get(`/api/user/${userId}/completed`);
      const filteredChallenges = challengeObjs
        .map((challenge) => ({
          ...challenge,
          likedByUser: userLikes.includes(challenge._id),
          addedToTodo: todoIds.includes(challenge._id),
          completed: userCompleted.includes(challenge._id),
        }))
        .filter((challenge) => userLikes.includes(challenge._id));
      setlikedChallenges(filteredChallenges);
      setAllChallenges(challengeObjs);
    };
    fetchLikedChallenges();
  }, [userId]);

  useEffect(() => {
    console.log("UserID for API request:", userId); // Log the userId
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
    const fetchUserData = async () => {
      try {
        const data = await get(`/api/user/${userId}`);
        console.log("Fetched user data:", data); // Log the fetched user data
        console.log("Username:", data.username); // Log the username
        console.log("userData contains username:", 'username' in data); // Verify userData contains username
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchCreatedChallenges = async () => {
      try {
        const challenges = await get(`/api/user/${userId}/created`);
        setCreatedChallenges(challenges);
      } catch (error) {
        console.error("Failed to fetch created challenges:", error);
      }
    };
    fetchCreatedChallenges();
  }, [userId]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const users = await get(`/api/users`);
        setAllUsers(users);
      } catch (error) {
        console.error("Failed to fetch all users:", error);
      }
    };
    fetchAllUsers();
  }, []);

  const handleShowLiked = () => setShowLikedChallenges(true);
  const handleShowCreated = () => setShowLikedChallenges(false);

  const displayedChallenges = showLikedChallenges ? likedChallenges : createdChallenges;

  const totalChallenges = allChallenges.length;
  const completedChallenges = userData ? userData.completedChallenges.length : 0;
  const completionRate = totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0;

  const difficultyPoints = userData && userData.completedChallenges.length > 0
    ? allChallenges.reduce((sum, challenge) =>
        userData.completedChallenges.includes(challenge._id) ? sum + challenge.difficulty : sum
      , 0)
    : 0;

  const sortedByCompletionRate = [...allUsers].sort((a, b) => b.completionRate - a.completionRate);
  const rankPercentage = sortedByCompletionRate.findIndex(user => user._id === userId) + 1;

  const pointsRank = allUsers.length > 0 ? allUsers.sort((a, b) => b.difficultyPoints - a.difficultyPoints).findIndex(user => user._id === userId) + 1 : 0;

  useEffect(() => {
    if (userData) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        percentRank: rankPercentage,
        pointsRank: pointsRank,
        completionRate: completionRate,
        difficultyPoints: difficultyPoints
      }));

      // Update user data in the database
      post('/api/user/update', {
        userId: userId,
        percentRank: rankPercentage,
        pointsRank: pointsRank,
        completionRate: completionRate,
        difficultyPoints: difficultyPoints
      });
    }
  }, [rankPercentage, pointsRank, completionRate, difficultyPoints]);

  return (
    <div className="overall">
      {userData ? (
        <ProfileCard
          username={userData.name}
          major={userData.major}
          dorm={userData.dorm}
          classyear={userData.classYear}
          completionRate={completionRate}
          difficultyPoints={difficultyPoints}
          percentRank={rankPercentage}
          pointsRank={pointsRank}
          userId={userId}
          profileImage={profileImage}
        />
      ) : (
        <p>Loading...</p>
      )}
      <div className="tabs">
        <button className={showLikedChallenges ? 'active' : ''} onClick={handleShowLiked}>Liked Challenges</button>
        <button className={!showLikedChallenges ? 'active' : ''} onClick={handleShowCreated}>Created Challenges</button>
      </div>
      <div className="ChallengeList">
        {displayedChallenges.length > 0 ? (
          displayedChallenges.map((challenge) => (
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
              num_completed={challenge.num_completed}
              completed={challenge.completed}
              userId={userId}
            />
          ))
        ) : (
          <p>No challenges found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
