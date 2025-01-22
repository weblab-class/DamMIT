const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  likedChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Challenge" }],
  todoChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Challenge" }],
  completedChallenges: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
  ],
  classYear: Number,
  major: String,
  dorm: String,
  percentRank: Number,
  pointsRank: Number,
});

// compile model from schema
module.exports = mongoose.model("User", UserSchema);
