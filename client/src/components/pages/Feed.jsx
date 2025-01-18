import React, { useState, useEffect } from "react";
import Card from "../modules/Card";
import { NewChallenge } from "../modules/NewChallengeInput";
import { useOutletContext } from "react-router-dom";

import { get } from "../../utilities";

const Feed = () => {
  let props = useOutletContext();
  // hardcoded challenge, change this later
  const [challenges, setChallenges] = useState([]);

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    document.title = "News Feed";
    get("/api/challenges").then((challengeObjs) => {
      let reversedChallengeObjs = challengeObjs.reverse();
      setChallenges((prevChallenges) => [
        ...prevChallenges,
        ...reversedChallengeObjs,
      ]);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewChallenge = (challengeObj) => {
    setChallenges([challengeObj].concat(challenges));
  };

  let challengesList = null;
  const hasChallenges = challenges.length !== 0;
  if (hasChallenges) {
    challengesList = challenges.map((challengeObj) => (
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
      {props.userId && <NewChallenge addNewChallenge={addNewChallenge} />}
      {challengesList}
    </>
  );
};

export default Feed;
