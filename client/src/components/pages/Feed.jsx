import React, { useState, useEffect } from "react";
import Card from "../modules/Card";
import { useOutletContext } from "react-router-dom";

import { get } from "../../utilities";
import "./Feed.css";

const Feed = () => {
  let props = useOutletContext();
  const [challenges, setChallenges] = useState([]);
  const [sortOption, setSortOption] = useState('mostLiked');

  useEffect(() => {
    const fetchChallenges = async () => {
      const challengeObjs = await get("/api/challenges");
      const userLikes = await get(`/api/user/${props.userId}/likes`);
      const userTodos = await get(`/api/user/${props.userId}/todos`);
      const userCompleted = await get(`/api/user/${props.userId}/completed`);
      const updatedChallenges = challengeObjs.map((challenge) => ({
        ...challenge,
        likedByUser: userLikes.includes(challenge._id),
        addedToTodo: userTodos.includes(challenge._id),
        completed: userCompleted.includes(challenge._id),
      }));
      setChallenges(updatedChallenges);
    };
    fetchChallenges();
  }, [props.userId]);

  const sortedChallenges = [...challenges].sort((a, b) => {
    if (sortOption === 'mostLiked') {
      return b.likes - a.likes;
    } else if (sortOption === 'onTrend') {
      return b.num_completed - a.num_completed;
    } else if (sortOption === 'new') {
      return new Date(b.postedDate) - new Date(a.postedDate);
    }
    return 0;
  });

  let challengesList = null;
  const hasChallenges = sortedChallenges.length !== 0;
  if (hasChallenges) {
    challengesList = sortedChallenges.map((challengeObj) => (
      <Card
        key={challengeObj._id}
        _id={challengeObj._id}
        creator_name={challengeObj.creator_name}
        creator_id={challengeObj.creator_id}
        title={challengeObj.title}
        content={challengeObj.content}
        likes={challengeObj.likes}
        difficulty={challengeObj.difficulty}
        likedByUser={challengeObj.likedByUser}
        addedToTodo={challengeObj.addedToTodo}
        completedByUser={challengeObj.completed}
        num_completed={challengeObj.num_completed}
        completed={challengeObj.completed}
        userId={props.userId}
      />
    ));
  } else {
    challengesList = <div>No Challenges!</div>;
  }

  return (
    <>
      <div className="tabs">
        <button className={sortOption === 'mostLiked' ? 'active' : ''} onClick={() => setSortOption('mostLiked')}>Most Liked</button>
        <button className={sortOption === 'onTrend' ? 'active' : ''} onClick={() => setSortOption('onTrend')}>On Trend</button>
        <button className={sortOption === 'new' ? 'active' : ''} onClick={() => setSortOption('new')}>New</button>
      </div>
      {challengesList}
    </>
  );
};

export default Feed;
