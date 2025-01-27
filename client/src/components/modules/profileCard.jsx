import React, { useState } from "react";
import "../pages/Profile.css";
import { post } from "../../utilities";

const ProfileCard = ({
  username,
  completionRate,
  difficultyPoints,
  percentRank,
  pointsRank,
  major,
  dorm,
  classyear,
  userId,
}) => {
  const im = "/default-profile.png";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    userId: userId,
    name: username,
    major: major,
    dorm: dorm,
    classYear: classyear,
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    try {
      const response = await post("/api/user/update", {
        ...formData,
        profileImage,
      });
      console.log("Server response:", response);
      if (response.success) {
        handleCloseModal();
      } else {
        console.error("Failed to update user info:", response.message);
      }
    } catch (error) {
      console.error("Failed to update user info:", error);
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-section u-flex">
        <div className="pic">
          <h2>@{username}</h2>
        </div>
        <div>
          <div className="personal_info subContainer u-flex ">
            <h3 className="subContainer">🎓{major}</h3>
            <h3 className="subContainer">🏢{dorm}</h3>
            <h3 className="subContainer">📆{classyear}</h3>
          </div>
          <div className="profile-stats u-flex subContainer">
            <p className="subContainer">✅{completionRate}% Completed </p>
            <p className="subContainer">💪{difficultyPoints} Difficulty Pts</p>
          </div>
          <div className="rankings u-flex subContainer">
            <p className="subContainer">% Ranking: {percentRank}</p>
            <p className="subContainer">Pts Ranking: {pointsRank}</p>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Major:
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                />
              </label>
              <label>
                Dorm:
                <input
                  type="text"
                  name="dorm"
                  value={formData.dorm}
                  onChange={handleChange}
                />
              </label>
              <label>
                Class Year:
                <input
                  type="number"
                  name="classYear"
                  value={formData.classYear}
                  onChange={handleChange}
                />
              </label>
              <label>
                Profile Picture:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={handleCloseModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
