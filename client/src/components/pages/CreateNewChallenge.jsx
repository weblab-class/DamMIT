import React, { useState } from "react";
import { post } from "../../utilities";
import "./CreateNewChallenge.css";

const CreateNewChallenge = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  const difficultyMapping = {
    "Harvard Stuff": 1,
    "Easy": 2,
    "Medium": 3,
    "Hard": 4,
    "MIT Stuff": 5
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const numericDifficulty = difficultyMapping[difficulty];
      await post("/api/challenge/new", { title, description, difficulty: numericDifficulty });
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
        <div className="form-group">
          <label className="form-label">Difficulty</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Harvard Stuff">Harvard Stuff</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="MIT Stuff">MIT Stuff</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateNewChallenge;
