const mongoose = require("mongoose");

//define a challenge schema for the database
const ChallengeSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  timestamp: { type: Date, default: Date.now },
  content: String,
  title: String,
  likes: { type: Number, default: 0 },
  num_completed: { type: Number, default: 0 },
});

// compile model from schema
module.exports = mongoose.model("challenge", ChallengeSchema);
