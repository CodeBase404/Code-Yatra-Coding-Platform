const express = require("express");
const { getSolutions, createSolution, voteSolution } = require("../controllers/solution.controller.js");
const { userAuthMiddleware } = require("../middlewares/auth.middleware.js");

const solutionRouter = express.Router();

solutionRouter.get("/:problemId",userAuthMiddleware, getSolutions);
solutionRouter.post("/:problemId",userAuthMiddleware, createSolution);
solutionRouter.post("/:id/vote", userAuthMiddleware, voteSolution);


module.exports = solutionRouter;
