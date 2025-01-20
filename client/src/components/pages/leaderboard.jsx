// App.jsx
import React from "react";
import "./Leaderboard.css";
import "./Feed.css";

const Leaderboard = () => {
  const [showClassYearDropdown, setShowClassYearDropdown] = React.useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = React.useState(false);
  // const [users, setUsers] = useState([]);
  // const [sortBy, setSortBy] = useState('points')
  // Fetch users data when component mounts
  // useEffect(() => {
  //   // Replace with your actual API endpoint
  //   fetch('/api/users')
  //     .then(res => res.json())
  //     .then(data => setUsers(data))
  //     .catch(err => console.log(err));
  // }, []);
  // Sort users based on criteria
  // const sortedUsers = [...users].sort((a, b) => {
  //   if (sortBy === 'points') {
  //     return b.difficultyPoints - a.difficultyPoints;
  //   }
  //   return b.completionRate - a.completionRate;
  // });
  return (
    <div className="container">
      <div className="search-container ">
        <input
          type="text"
          className="search-bar"
          placeholder="Search a challenger or enter a score"
        />
      </div>

      <div className="tabs dropdown">
        <div className="dropdown">
            <button calssName="buttons" onClick={() => setShowClassYearDropdown(!showClassYearDropdown)}>
              Class year
            </button>
            {showClassYearDropdown && (
              <div className="dropdown-content">
                <button>2025</button>
                <button>2026</button>
                <button>2027</button>
                <button>2028</button>
              </div>
            )}
        </div>
        <div className="dropdown">
            <button onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
              Category
            </button>
            {showCategoryDropdown && (
              <div className="dropdown-content">
                <button>number of challenges</button>
                <button>difficulty</button>
              </div>
            )}
        </div>
      </div>

      <table className="leaderboard">
        <thead>
        {/* {sortedUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.completionRate}%</td>
              <td>{user.difficultyPoints}</td>
              <td>{user.major}</td>
              <td>{user.classyear}</td> */}
          <tr>
            <th>Ranking </th>
            <th>Username</th>
            <th>Score </th>
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
