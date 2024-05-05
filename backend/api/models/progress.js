const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  problemId: { type: String },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("UserProgress", userProgressSchema);
