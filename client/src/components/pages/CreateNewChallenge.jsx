import React, { useState } from "react";
import { post } from "../../utilities";
import "./CreateNewChallenge.css";

const CreateNewChallenge = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await post("/api/challenge", { title, description });
      setTitle("");
      setDescription("");
      alert("Challenge created successfully!");
    } catch (error) {
      console.error("Error creating challenge:", error);
    }
  };

  return (
    <div className="CreateNewChallenge">
      <h2>Create a New Challenge</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateNewChallenge;
