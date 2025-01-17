import React, { useState, useEffect } from "react";
import SingleChallenge from "./SingleChallenge";
import { get } from "../../utilities";

import "./Card.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the challenge
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the challenge
 * @param {string} title of the challenge
 */
const Card = (props) => {
  return (
    <div className="Card-container">
      <SingleChallenge
        _id={props._id}
        creator_name={props.creator_name}
        creator_id={props.creator_id}
        content={props.content}
        title={props.title}
      />
    </div>
  );
};

export default Card;
