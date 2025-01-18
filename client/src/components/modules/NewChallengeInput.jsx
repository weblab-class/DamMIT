import React, { useState } from "react";

import "./NewChallengeInput.css";
import { post } from "../../utilities";

/**
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} challengeId optional prop, used for comments
 * @param {({challengeId, title, description}) => void} onSubmit: (function) triggered when this post is submitted, takes {challengeId, title, description} as parameters
 */
const NewChallengeInput = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // called whenever the user types in the new post input box
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder="Challenge Title"
        value={title}
        onChange={handleTitleChange}
        className="NewChallengeInput-input"
      />
      <input
        type="text"
        placeholder={props.defaultText}
        value={description}
        onChange={handleDescriptionChange}
        className="NewChallengeInput-input"
      />
      <button
        type="submit"
        className="NewChallengeInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

/**
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
const NewChallenge = (props) => {
  const addChallenge = (challenge) => {
    const body = { title: challenge.title, content: challenge.description };
    post("/api/challenge", body).then((challenge) => {
      // display this challenge on the screen
      props.addNewChallenge(challenge);
    });
  };

  return (
    <NewChallengeInput defaultText="New Challenge" onSubmit={addChallenge} />
  );
};

export { NewChallenge };
