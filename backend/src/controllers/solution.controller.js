const mongoose = require("mongoose");
const Solution = require("../models/solution.model");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET all shared solutions for a problem
const getSolutions = async (req, res) => {
  try {
    const { problemId } = req.params;

    if (!isValidObjectId(problemId)) {
      return res.status(400).json({ success: false, message: "Invalid problem ID" });
    }

    const solutions = await Solution.find({ problemId })
      .populate("userId", "firstName profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, solutions });
  } catch (error) {
    console.error("Error fetching solutions:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST share a new solution
const createSolution = async (req, res) => {
  try {
    const { problemId } = req.params;
    const { code, explanation, language } = req.body;
    const userId = req.user?._id;

    if (!isValidObjectId(problemId) || !code?.trim()) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const solution = new Solution({
      problemId,
      userId,
      code: code.trim(),
      explanation: explanation?.trim() || "",
      language: language || "JavaScript",
    });

    await solution.save();
    const populated = await solution.populate("userId", "firstName profileImage");

    res.status(201).json({ success: true, solution: populated });
  } catch (err) {
    console.error("Error posting solution:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST vote on a solution
const voteSolution = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;
    const userId = req.user._id;

    const solution = await Solution.findById(id);
    if (!solution) return res.status(404).json({ error: "Solution not found" });

    // Remove previous vote
    solution.upvotes.pull(userId);
    solution.downvotes.pull(userId);

    // Add new vote
    if (action === "upvote") solution.upvotes.push(userId);
    if (action === "downvote") solution.downvotes.push(userId);

    await solution.save();

    res.status(200).json({
      upvotes: solution.upvotes.length,
      downvotes: solution.downvotes.length,
    });
  } catch (err) {
    console.error("Vote error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getSolutions,
  createSolution,
  voteSolution,
};
