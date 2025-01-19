import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaSquarePlus, FaCircleCheck } from "react-icons/fa6";
import { get, post } from "../../utilities";
import "../../utilities.css";

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
 * @param {boolean} completed
 * @param {string} userId
 */
const SingleChallenge = (props) => {
  const [isLiked, setIsLiked] = useState(props.likedByUser);
  const [likes, setLikes] = useState(props.likes);
  const [isAddedToTodo, setIsAddedToTodo] = useState(props.addedToTodo);
  const [isComplete, setIsComplete] = useState(props.completed);

  const toggleLike = async () => {
    const updatedLikeStatus = !isLiked;
    setIsLiked(updatedLikeStatus);
    setLikes(updatedLikeStatus ? likes + 1 : likes - 1);

    try {
      await post(`/api/challenge/${props._id}/like`, {
        userId: props.userId,
        like: updatedLikeStatus,
      });
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const toggleAddToTodo = async () => {
    const updatedTodoStatus = !isAddedToTodo;
    setIsAddedToTodo(updatedTodoStatus);

    try {
      await post(`/api/challenge/${props._id}/todo`, {
        userId: props.userId,
        addToTodo: updatedTodoStatus,
      });
    } catch (error) {
      console.error("Error updating to-do status:", error);
    }
  };

  const toggleComplete = async () => {
    const updatedCompleteStatus = !isComplete;
    setIsComplete(updatedCompleteStatus);

    try {
      await post(`/api/challenge/${props._id}/complete`, {
        userId: props.userId,
        complete: updatedCompleteStatus,
      });
    } catch (error) {
      console.error("Error updating complete status:", error);
    }
  };

  return (
    <div className="Card-challenge">
      <p className="Card-challengeTitle">{props.title}</p>
      <p className="Card-challengeContent">{props.content}</p>
      <div className="Card-challengeFooter">
        <div className="Card-challengeIcons">
          <p
            className="Card-challengeLiked"
            onClick={toggleLike}
            style={{ cursor: "pointer" }}
          >
            {isLiked ? (
              <FaHeart color="#e63946" size={30} />
            ) : (
              <FaHeart color="#457b9d" size={30} />
            )}
          </p>
          <p
            className="Card-challengeTodo"
            onClick={toggleAddToTodo}
            style={{ cursor: "pointer" }}
          >
            {isAddedToTodo ? (
              <FaSquarePlus color="#1d3557" size={30} />
            ) : (
              <FaSquarePlus color="#457b9d" size={30} />
            )}
          </p>
          <p
            className="Card-challengeComplete"
            onClick={toggleComplete}
            style={{ cursor: "pointer" }}
          >
            {isComplete ? (
              <FaCircleCheck color="#1d3557" size={30} />
            ) : (
              <FaCircleCheck color="#457b9d" size={30} />
            )}
          </p>
        </div>
        <div className="Card-challengeDetails">
          <p className="Card-challengeDifficulty">
            Current Difficulty: {props.difficulty}
          </p>
          <p className="Card-challengeCompleted">
            {props.num_completed} Completed
          </p>
          <p className="Card-challengeLikes">{likes} Likes</p>
        </div>
      </div>
    </div>
  );
};

export default SingleChallenge;
