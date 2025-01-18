import React, { useState, useEffect } from "react";
import Card from "../modules/Card";
import { useOutletContext } from "react-router-dom";

import { get } from "../../utilities";
import "./Feed.css";

const Feed = () => {
  let props = useOutletContext();
  const [challenges, setChallenges] = useState([]);
  const [sortOption, setSortOption] = useState('mostLiked');

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    document.title = "News Feed";
    get("/api/challenges").then((challengeObjs) => {
      setChallenges(challengeObjs);
    });
  }, []);

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
        key={`Card_${challengeObj._id}`}
        _id={challengeObj._id}
        creator_name={challengeObj.creator_name}
        creator_id={challengeObj.creator_id}
        userId={props.userId}
        content={challengeObj.content}
        title={challengeObj.title}
        likes={challengeObj.likes}
        difficulty={challengeObj.difficulty}
        likedByUser={challengeObj.likedByUser}
        addedToTodo={challengeObj.addedToTodo}
        num_completed={challengeObj.num_completed}
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
