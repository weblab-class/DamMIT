const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  googleid: String,
  classYear: Number,
  major: String,
  dorm: String,
  percentRank: { type: Number, default: 0 },
  pointsRank: { type: Number, default: 0 },
  completionRate: { type: Number, default: 0 },
  difficultyPoints: { type: Number, default: 0 },
  completedChallenges: { type: [String], default: [] },
  likedChallenges: { type: [String], default: [] },
  todoChallenges: { type: [String], default: [] },
});

// compile model from schema
module.exports = mongoose.model("User", UserSchema);
