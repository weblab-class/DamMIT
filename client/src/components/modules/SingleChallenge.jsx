import React from "react";
import { Link } from "react-router-dom";

/**
 * Challenge is a component that renders creator and content of a challenge
 *
 * Proptypes
 * @param {string} _id of the challenge
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} title of the challenge
 * @param {string} content of the challenge
 * @param {number} likes
 * @param {number} difficulty
 * @param {boolean} likedByUser
 * @param {boolean} addedToTodo
 * @param {number} num_completed
 */
const SingleChallenge = (props) => {
  return (
    <div className="Card-challenge">
      <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
        {props.creator_name}
      </Link>
      <p className="Card-challengeTitle">{props.title}</p>
      <p className="Card-challengeContent">{props.content}</p>
      <div className="Card-challengeInfo">
        <p className="Card-challengeLiked">
          Liked by you: {props.likedByUser ? "Yes" : "No"}
        </p>
        <p className="Card-challengeTodo">
          Added to your to-do list: {props.addedToTodo ? "Yes" : "No"}
        </p>
        <p className="Card-challengeCompleted">
          {props.num_completed} Completed
        </p>
        <p className="Card-challengeDifficulty">
          Current Difficulty: {props.difficulty}
        </p>
        <p className="Card-challengeLikes">{props.likes} Likes</p>
      </div>
    </div>
  );
};

export default SingleChallenge;
