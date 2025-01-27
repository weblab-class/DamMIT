import React, { useState, useEffect } from "react";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [sortOption, setSortOption] = useState('difficultyPoints');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched users:", data); // Log the fetched data
        if (Array.isArray(data)) {
          const sortedUsers = data.sort((a, b) => {
            if (sortOption === 'difficultyPoints') {
              return (b.difficultyPoints || 0) - (a.difficultyPoints || 0);
            }
            return (b.completionRate || 0) - (a.completionRate || 0);
          });
          setUsers(sortedUsers);
          console.log("Sorted users:", sortedUsers); // Log the sorted users
        } else {
          console.error("API response is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [sortOption]);

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <div className="tabs">
        <button className={sortOption === 'difficultyPoints' ? 'active' : ''} onClick={() => setSortOption('difficultyPoints')}>Total Difficulty Points</button>
        <button className={sortOption === 'completionRate' ? 'active' : ''} onClick={() => setSortOption('completionRate')}>Completion Rate</button>
      </div>
      <table className="leaderboard">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Class Year</th>
            <th>Major</th>
            <th>Dorm</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name || 'N/A'}</td>
              <td>{user.classYear || 'N/A'}</td>
              <td>{user.major || 'N/A'}</td>
              <td>{user.dorm || 'N/A'}</td>
              <td>{sortOption === 'difficultyPoints' ? (user.difficultyPoints || 0) : (user.completionRate || 0) + '%'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
