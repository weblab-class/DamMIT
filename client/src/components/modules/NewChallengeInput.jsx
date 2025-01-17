import React, { useState } from "react";

import "./NewChallengeInput.css";
import { post } from "../../utilities";

/**
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} challengeId optional prop, used for comments
 * @param {({challengeId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {challengeId, value} as parameters
 */
const NewChallengeInput = (props) => {
  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
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
  const addChallenge = (value) => {
    const body = { content: value };
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
