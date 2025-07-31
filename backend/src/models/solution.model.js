// models/solution.model.js
const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "problem",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  language: String,
  code: String,
  explanation: String,
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Solution = mongoose.model("solution", solutionSchema);
module.exports = Solution
