import React, { useState, useEffect } from "react";
import Card from "../modules/Card";
import { useOutletContext } from "react-router-dom";
import { get } from "../../utilities";
import "./ToDoList.css";

const ToDoList = () => {
  const props = useOutletContext();
  const [todoChallenges, setTodoChallenges] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchTodoChallenges = async () => {
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
        .filter((challenge) => todoIds.includes(challenge._id));
      setTodoChallenges(filteredChallenges);
    };
    fetchTodoChallenges();
  }, [props.userId]);

  const filteredChallenges = todoChallenges.filter((challenge) => {
    if (activeTab === "completed") return challenge.completed;
    if (activeTab === "notCompleted") return !challenge.completed;
    return true; // all challenges
  });

  return (
    <div>
      <div className="tabs">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          All Challenges
        </button>
        <button
          className={activeTab === "completed" ? "active" : ""}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
        <button
          className={activeTab === "notCompleted" ? "active" : ""}
          onClick={() => setActiveTab("notCompleted")}
        >
          Not Completed
        </button>
      </div>
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
          <p>No challenges in your to-do list!</p>
        )}
      </div>
    </div>
  );
};

export default ToDoList;
