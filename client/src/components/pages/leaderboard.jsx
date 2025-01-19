// App.jsx
import React from "react";
import "./Leaderboard.css";

const Leaderboard = () => {
  return (
    <div className="container">
      <header className="header">
        <h1 className="logo">DamMIT</h1>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">New Challenge</a>
          <a href="#">To Do List</a>
          <a href="#">Leaderboard</a>
          <a href="#">My Profile</a>
        </nav>
      </header>

      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search a challenger or enter a score"
        />
      </div>

      <div className="filter-buttons">
        <button>Class year</button>
        <button>Major</button>
        <button>Category</button>
      </div>

      <table className="leaderboard">
        <thead>
          <tr>
            <th>Leaderboard</th>
            <th>Ranking &#8595;</th>
            <th>Score &#8595;</th>
            <th>Major 🎓</th>
            <th>Class year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Adem</td>
            <td>1</td>
            <td>123</td>
            <td>Computer Science</td>
            <td>28'</td>
          </tr>
          <tr>
            <td>Olya</td>
            <td>1</td>
            <td>123</td>
            <td>Computer Science</td>
            <td>28'</td>
          </tr>
          <tr>
            <td>Paulo</td>
            <td>1</td>
            <td>123</td>
            <td>Computer Science</td>
            <td>28'</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
